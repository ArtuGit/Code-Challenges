import {Queue} from "./classes/lists.js";
import {ATTEMPTS, PORTION_LENGTH, QUEUE_LENGTH} from "./constants.js";
import {getJsonPlaceholder} from "./boundaries.js";

for (let i = 1; i <= QUEUE_LENGTH; i++) {
  Queue.addEntity(i)
}

const getPortion = () => {
  return Queue.list.filter(
    (e) => (!e.result || e.attempts >= ATTEMPTS)).slice(0, PORTION_LENGTH)
}

const fetchData = async () => {
  console.log('--- Starting fetch ---')
  console.log('Queue before:', Queue.list)
  let portion
  portion = getPortion()

  while (portion.length > 0) {

    const portionPromises = portion.map(async (e) => {
      return getJsonPlaceholder(e.id)
    })

    const response = await Promise.all(portionPromises)

    response.forEach(
      (e) => {
        const ind = Queue.findEntityIndex(e.id)
        if (ind !== -1) {
          Queue.list[ind].attempt()
          Queue.list[ind].fill(e.body)
        }
      }
    )

    portion = getPortion()
  }
  console.log('Queue after:', Queue.list)
}

setInterval(fetchData, 60 * 60 * 1000);
