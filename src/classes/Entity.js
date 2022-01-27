export class Entity {
  constructor(id) {
    this.id = id
    this.result = null
    this.attempts = 0
  }

  fill(userId, title, body) {
    this.result = {
      userId, title, body
    }
  }
}

