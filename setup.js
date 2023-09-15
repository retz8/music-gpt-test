// // script to run two functions to setup pinecone index
console.log("hello");

async function main() {
  try {
    const result = await fetch("/api/setup", {
      method: "POST",
    });
    const json = await result.json();
    console.log("result: ", json);
  } catch (err) {
    console.log("error: ", err);
  }
}

main();
