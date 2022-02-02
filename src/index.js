import mongoose from 'mongoose'
import { fetchData, initQueue } from './fetch.js'
import { apiDescription, app } from './api.js'

const port = 3000

async function main () {
  try {
    await mongoose.connect('mongodb://localhost:27017/adway-code-test')
    console.log('Mongoose is connected')
  } catch (error) {
    console.error(error)
  }

  apiDescription()
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
  })

  initQueue()
  fetchData()
// setInterval(fetchData, 60 * 60 * 1000)
}

main()
