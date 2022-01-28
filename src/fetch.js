import {Queue} from "./classes/lists.js";
import {getJsonPlaceholder} from "./boundaries.js";
import {ATTEMPTS, PORTION_LENGTH, QUEUE_LENGTH} from "./constants.js";
import {DbBulkUpsert} from "./db.js";

export const initQueue = () => {
  for (let i = 1; i <= QUEUE_LENGTH; i++) {
    Queue.addEntity(i)
  }
}
const getPortion = () => {
  return Queue.list.filter(
    (e) => (!e.result || e.attempts >= ATTEMPTS)).slice(0, PORTION_LENGTH)
}
export const fetchData = async () => {
  console.log('--- Starting fetch ---')
  let dbUpserted = 0
  let DbPayload
  let portion
  portion = getPortion()

  while (portion.length > 0) {
    DbPayload = []
    const portionPromises = portion.map(async (e) => {
      return getJsonPlaceholder(e.id)
    })

    const response = await Promise.all(portionPromises)

    response.forEach(
      (e) => {
        const ind = Queue.findEntityIndex(e.id)
        if (ind !== -1) {
          Queue.list[ind].attempt()
          if (e.body) {
            Queue.list[ind].fill(e.body)
            DbPayload.push({id: e.id, ...e.body})
          }
        }
      }
    )
    dbUpserted = dbUpserted + (await DbBulkUpsert(DbPayload))
    portion = getPortion()
  }
  console.log(`Fetched ${Queue.list.length}, upserted ${dbUpserted} items`)
}