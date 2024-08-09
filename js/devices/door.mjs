import { Device } from '../app.mjs'

export class Door extends Device {
  constructor(name, isOpen = false) {
    super(name)
    this.isOpen = isOpen
  }

  open() {
    this.isOpen = true
  }

  close() {
    this.isOpen = false
  }
}
