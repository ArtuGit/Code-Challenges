import {upsertBlogPost} from "../db.js";

export class Entity {
  constructor(id) {
    this.id = id
    this.result = null
    this.attempts = 0
  }

  attempt() {
    this.attempts++
  }

  fill(payload) {
    this.result = payload
    upsertBlogPost(this.id, payload)
  }
}

