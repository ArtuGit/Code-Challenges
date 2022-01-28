import mongoose from "mongoose";
import {fetchData, initQueue} from "./fetch.js";


try {
  await mongoose.connect('mongodb://localhost:27017/adway-code-test');
  console.log('Mongoose is connected')
} catch (error) {
  console.error(error);
}

initQueue()
fetchData()
//setInterval(fetchData, 60 * 60 * 1000);
