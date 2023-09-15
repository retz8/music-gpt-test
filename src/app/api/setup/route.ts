import { createPineconeIndex, updatePineconeWithData } from "@/services";
import { Pinecone } from "@pinecone-database/pinecone";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const loader = new DirectoryLoader("./src/documents", {
    ".txt": (path) => new TextLoader(path),
    ".pdf": (path) => new TextLoader(path),
    ".md": (path) => new PDFLoader(path),
  });

  const docs = await loader.load();

  console.log("docs: ", docs);

  if (
    process.env.PINECONE_API_KEY === undefined ||
    process.env.PINECONE_ENVIRONMENT === undefined
  ) {
    return NextResponse.json({
      error: "Pinecone API Key or Environment not found",
    });
  }

  // Create Pinecone Object
  const client = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENVIRONMENT,
  });

  try {
    await createPineconeIndex({ client });
    await updatePineconeWithData({ client, docs });
  } catch (err) {
    console.log("error: ", err);
  }

  return NextResponse.json({
    data: "successfully created index and loaded data into pinecone vectorstore",
  });
}
