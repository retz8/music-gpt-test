// index.ts
// : pre backend logic (creating vectorspace and in-context injection)

// Will create script file to run these two functions to setup pinecone index

import {
  Pinecone,
  PineconeRecord,
  RecordMetadata,
} from "@pinecone-database/pinecone";
import { Document } from "langchain/document";
import { indexConfig, timeout, vectorDimension } from "@/configs";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

type Props = {
  client: Pinecone;
};

/** creating a pinecone (vectorspace) index */
export const createPineconeIndex = async ({ client }: Props) => {
  // if (
  //   process.env.PINECONE_API_KEY === undefined ||
  //   process.env.PINECONE_ENVIRONMENT === undefined
  // ) {
  //   throw new Error("Pinecone API Key or Environment not found");
  // }

  // // 1. Create Pinecone Object
  // const client = new Pinecone({
  //   apiKey: process.env.PINECONE_API_KEY,
  //   environment: process.env.PINECONE_ENVIRONMENT,
  // });

  // 2. Check Duplicate Pinecone Index
  const indexName = indexConfig.name;
  console.log(`Checking for duplicate index: ${indexName} ...`);
  const existingIndex = await client.listIndexes();

  if (!existingIndex.includes(indexConfig)) {
    // 3. Create Pinecone Index
    console.log(`Creating: ${indexName} ...`);

    await client.createIndex({
      name: indexName,
      dimension: vectorDimension,
      metric: "cosine", // euclidean, cosine, dotproduct중에서 cosine이 가장 chatbot의 목적과 가장 유사
      // free plan: pods = 1 (default)
    });

    // wait for index initialization
    console.log(`Creating index... please wait for it to finish initializing.`);
    await new Promise((resolve) => setTimeout(resolve, timeout));
  } else {
    console.log(`Index ${indexName} already exists.`);
  }
};

type UpdateProps = {
  client: Pinecone;
  docs: Document[];
};

/** uploading data to pinecone index */
export const updatePineconeWithData = async ({ client, docs }: UpdateProps) => {
  // 1. Retrieve Pinecone Index
  //   const indexName = indexConfig.name;
  const indexName = "music-gpt-test-index";
  const index = client.index(indexName);

  // 2. Process each document in the docs array
  for (const doc of docs) {
    console.log(`Uploading document: ${doc.metadata.source} ...`);
    const txtPath = doc.metadata.source;
    const text = doc.pageContent;

    // 3. Split text into text chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 100,
    });
    const chunks = await textSplitter.createDocuments([text]);
    console.log(`Text split into ${chunks.length} chunks.`);

    // 4. Create embeddings
    const embeddings = await new OpenAIEmbeddings().embedDocuments(
      chunks.map((chunk) => chunk.pageContent.replace(/\n/g, " ")) // \n => " " replace
    );
    console.log(" Finished creating embeddings.");

    // 5. Upload embeddings to Pinecone Index
    const batchSize = 100;
    let batch: PineconeRecord<RecordMetadata>[] = [];
    for (let idx = 0; idx < chunks.length; idx++) {
      console.log("idx: ", idx);
      const chunk = chunks[idx];
      // This is what we will store in vectorstore
      const vector = {
        id: `${idx}`,
        values: embeddings[idx],
        metadata: {
          ...chunk.metadata,
          loc: JSON.stringify(chunk.metadata.loc),
          pageContent: chunk.pageContent,
          txtPath: txtPath,
        }, // metadata 없어도됨
      };
      batch = [...batch, vector];
      console.log(vector);
      // When batch is full or it's the last item, upsert the vectors (insert => go to next batch)
      if (batch.length === batchSize || idx === chunks.length - 1) {
        await index.upsert(batch);
        // Empty the batch
        batch = [];
      }
    }

    console.log(`Pinecone index updated with ${chunks.length} vectors.`);
  }
};
