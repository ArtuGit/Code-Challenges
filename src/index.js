import got from 'got';
import {EntitiesList, Queue} from "./classes/lists.js";
import {PORTION_LENGTH, QUEUE_LENGTH} from "./constants";


// ToDo: Get from MongoDb
for (let i = 1; i <= QUEUE_LENGTH; i++) {
  Queue.addEntity(i)
}
console.log('Queue:',Queue.list)

/*
const {data} = await got.post('https://httpbin.org/anything', {
  json: {
    hello: 'world'
  }
}).json();

console.log(data);*/
