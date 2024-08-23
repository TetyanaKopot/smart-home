import { Device } from './device.js'

export class Door extends Device {
  constructor(name, isOpen = false) {
    super(name)
    this.isOpen = isOpen
  }

  open() {
    this.isOpen = true
    console.log(`${this.name} is open`)
  }

  close() {
    this.isOpen = false
    console.log(`${this.name} is close`)
  }

  getIcon() {
    return 'fa-solid fa-door-open'
  }

  getStatus() {
    return {
      isOpen: this.isOpen,
    }
  }
}
