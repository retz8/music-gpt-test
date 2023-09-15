import { PartialIndexDescription } from "@pinecone-database/pinecone";

export const indexConfig: PartialIndexDescription = {
  name: "music-gpt-test-index",
}; // pinecone index name
export const vectorDimension = 1536; // dimension of vectors

export const timeout = 80000; // 80 seconds
