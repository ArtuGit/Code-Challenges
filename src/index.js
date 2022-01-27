import {Queue} from "./classes/lists.js";
import {ATTEMPTS, PORTION_LENGTH, QUEUE_LENGTH} from "./constants.js";
import {getJsonPlaceholder} from "./boundaries.js";

// ToDo: Get from MongoDb
for (let i = 1; i <= QUEUE_LENGTH; i++) {
  Queue.addEntity(i)
}
console.log('Queue:', Queue.list)

const getPortion = () => {
  return Queue.list.filter(
    (e) => (e.result || e.attempts <= ATTEMPTS)).slice(0, PORTION_LENGTH)
}

const portion = getPortion()
console.log('getPortion:', getPortion())

const fetchData = async () => {
  const portionPromises = portion.map(async (e) => {
    return getJsonPlaceholder(e.id)
  })
  console.log('portionPromises', portionPromises)

  const res = await Promise.all(portionPromises)
  console.log('res', res)
}

fetchData()


