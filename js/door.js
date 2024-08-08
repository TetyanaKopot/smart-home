import { Device } from './baseClassOfDevice'

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
