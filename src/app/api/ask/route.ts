// accept parameter: query
// req => res

import { queryPineconeAndQueryLLM } from "@/services/qna";
import { Pinecone } from "@pinecone-database/pinecone";
import { NextRequest, NextResponse } from "next/server";
import { indexConfig } from "@/configs";

// req = { method: CRUD, body: query }

export async function POST(req: NextRequest) {
  const body = await req.json(); // body = query
  const question: string = body.question;
  const history: string[] = body.history;
  console.log(body);
  if (
    process.env.PINECONE_API_KEY === undefined ||
    process.env.PINECONE_ENVIRONMENT === undefined
  ) {
    return NextResponse.json({
      error: "Pinecone API Key or Environment not found",
    });
  }

  const client = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENVIRONMENT,
  });
  const indexName = indexConfig.name;
  const text = await queryPineconeAndQueryLLM({
    client,
    indexName,
    question,
    history,
  });

  return NextResponse.json({
    answer: text,
  });
}
