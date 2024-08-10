import { Door } from './door.js'

export class Curtains extends Door {
  constructor(name, isOpen = false, halfOpen = false) {
    super(name, isOpen)
    this.halfOpen = halfOpen
  }

  openHalf() {
    this.halfOpen = true
  }
}
