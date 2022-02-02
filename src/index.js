import mongoose from "mongoose";
import { fetchData } from "./fetch.js";
import { apiDescription, app } from "./api.js";

const port = 3000;

async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017/adway-code-test");
    console.log("Mongoose is connected");
  } catch (error) {
    console.error(error);
  }

  await fetchData();
  // setInterval(fetchData, 10000);
  setInterval(fetchData, 60 * 60 * 1000)

  apiDescription();
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
}

main();
