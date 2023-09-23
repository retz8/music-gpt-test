// qna.ts
// user interaction logic (asking questions + querying vectorspace + returning answers)

import { Pinecone } from "@pinecone-database/pinecone";
import {
  ConversationChain,
  ConversationalRetrievalQAChain,
  loadQARefineChain,
  loadQAStuffChain,
} from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { Document } from "langchain/document";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { BufferMemory, ConversationSummaryMemory } from "langchain/memory";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  MessagesPlaceholder,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { PineconeStore } from "langchain/vectorstores/pinecone";

type Props = {
  client: Pinecone;
  indexName: string;
  question: string;
  history: string[];
};

/** querying pinecone for data and query LLM*/
export const queryPineconeAndQueryLLM = async ({
  client,
  indexName,
  question,
  history,
}: Props) => {
  // 1. Retrieve Pinecone Index and save it as vector store
  const index = client.Index(indexName);
  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    { pineconeIndex: index }
  );

  // 2. Create Query Embedding
  const queryEmbedding = await new OpenAIEmbeddings().embedQuery(question);

  // 3. Query Pinecone Vectorstore and return top 10 matches
  let queryResponse = await index.query({
    topK: 5,
    vector: queryEmbedding,
    includeMetadata: true,
    includeValues: true, // 진짜 vector가 리턴됨
  });

  // 4. Ask Question to LLM
  console.log(`Asking Question: ${question} to LLM...`);
  if (queryResponse.matches?.length) {
    // set llm model
    const llm = new ChatOpenAI({
      modelName: "gpt-3.5-turbo",
      temperature: 0.5,
    });

    // create memory
    const memory = new ConversationSummaryMemory({
      memoryKey: "chat_history",
      llm: new ChatOpenAI({ modelName: "gpt-3.5-turbo", temperature: 0 }),
      returnMessages: true,
    });

    // create template
    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
      SystemMessagePromptTemplate.fromTemplate(
        "The following is a friendly conversation between a human and AI. The human is a person who is asking about music theory and history. If the AI doesn't make sense, say I don't know."
      ),
      new MessagesPlaceholder("chat_history"), // 현재 대화 내용 묵음의 이름을 지어주는거
      HumanMessagePromptTemplate.fromTemplate("{question}"),
    ]);

    // create chain
    // const chain = new ConversationChain({
    //   memory: new BufferMemory({
    //     returnMessages: true,
    //     memoryKey: "history",
    //   }),
    //   prompt: chatPrompt,
    //   llm: llm,
    // });

    // const chain = loadQAStuffChain(llm);
    const chain = ConversationalRetrievalQAChain.fromLLM(
      llm,
      vectorStore.asRetriever(),
      { returnSourceDocuments: true }
    );

    // Extract and Concatenate page content from matched documents
    // 5. Create Context
    const concatenatedPageContent = queryResponse.matches
      .map((match) => match.metadata?.pageContent)
      .join(" ");
    // 6. Ask LLM with Context and Question
    // const result = await chain.call({
    //   input_documents: [new Document({ pageContent: concatenatedPageContent })],
    //   question: question,
    // });

    const result = await chain.call({
      question: question,
      chat_history: history.map((h) => h).join("\n"),
    });

    console.log(`LLM Answer: ${result.text}`);
    return result.text;
  } else {
    console.log("Since there are no matches, we cannot ask LLM.");
  }
};
