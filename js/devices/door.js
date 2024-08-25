import { Device } from './device.js'

export class Door extends Device {
  constructor(name, isOpen = false) {
    super(name)
    this.isOpen = isOpen
    this.loadState()
  }

  getIcon() {
    return 'fa-solid fa-door-open'
  }

  getStatus() {
    return {
      isOpen: this.isOpen,
    }
  }

  loadState() {
    super.loadState()
    const state = JSON.parse(localStorage.getItem(this.name))
    if (state) {
      this.isOpen = state.isOpen
    }
  }

  open() {
    this.isOpen = true
    console.log(`${this.name} is open`)
    this.saveState()
    super.on()
    return this.isOpen
  }

  close() {
    this.isOpen = false
    console.log(`${this.name} is close`)
    this.saveState()
    super.off()
  }
}
