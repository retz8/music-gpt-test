// qna.ts
// user interaction logic (asking questions + querying vectorspace + returning answers)

import { Pinecone } from "@pinecone-database/pinecone";
import { ConversationChain, loadQAStuffChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { Document } from "langchain/document";
import { ChatOpenAI } from "langchain/chat_models/openai";

type Props = {
  client: Pinecone;
  indexName: string;
  body: string;
};

/** querying pinecone for data and query LLM*/
export const queryPineconeAndQueryLLM = async ({
  client,
  indexName,
  body,
}: Props) => {
  // 1. Retrieve Pinecone Index
  const index = client.Index(indexName);

  // 2. Create Query Embedding
  const queryEmbedding = await new OpenAIEmbeddings().embedQuery(body);

  // 3. Query Pinecone Vectorstore and return top 10 matches
  let queryResponse = await index.query({
    topK: 10,
    vector: queryEmbedding,
    includeMetadata: true,
    includeValues: true, // 진짜 vector가 리턴됨
  });

  // 4. Ask Question to LLM
  console.log(`Asking Question: ${body} to LLM...`);
  if (queryResponse.matches?.length) {
    // For now just basics no template nothing else
    const llm = new OpenAI({});
    // chain: we are not asking one question and getting no more answer => we want to keep asking questions
    // chain enables us to connect LLm with other services like agents, memory, etc.
    const chain = loadQAStuffChain(llm);
    // Extract and Concatenate page content from matched documents
    // 5. Create Context
    const concatenatedPageContent = queryResponse.matches
      .map((match) => match.metadata?.pageContent)
      .join(" ");
    // 6. Ask LLM with Context and Question
    const result = await chain.call({
      input_documents: [new Document({ pageContent: concatenatedPageContent })],
      question: body,
    });
    console.log(`LLM Answer: ${result.text}`);
    return result.text;
  } else {
    console.log("Since there are no matches, we cannot ask LLM.");
  }
};
