import {Entity} from "./Entity.js";

export class EntitiesList {
  lengthLimit = 0
  constructor(lengthLimit) {
    this.lengthLimit = lengthLimit
    this.list = [];
  }

  addEntity(id) {
    if (this.list.length < this.lengthLimit) {
      this.list.push(new Entity(id))
    } else {
      throw `The length of the Entities List (${this.lengthLimit}) is exceeded`
    }
  }

  findEntityIndex(id) {
    return this.list.findIndex(
      (e) => (e.id === id)
    )
  }
}

export const Queue = new EntitiesList(50)