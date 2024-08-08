import { Door } from './door'

export class Curtains extends Door {
  constructor(name, isOpen, halfOpen = false) {
    super(name, isOpen)
    this.halfOpen = halfOpen
  }

  openHalf() {
    this.halfOpen = true
  }
}
