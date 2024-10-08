import { Device } from './device.js'

export class Door extends Device {
  constructor(name, roomName, isOpen = false) {
    super(name)
    this.roomName = roomName
    this.isOpen = isOpen
  }

  getIcon() {
    return 'fa-solid fa-door-open'
  }

  getStatus() {
    return {
      isOpen: this.isOpen,
    }
  }

  loadState(roomName) {
    super.loadState(roomName)
    const state = JSON.parse(localStorage.getItem(this.getStorageKey(roomName)))
    if (state) {
      this.isOpen = state.isOpen
    }
  }

  open() {
    this.isOpen = true
    console.log(`${this.name} is open`)
    return this.isOpen
  }

  close() {
    this.isOpen = false
    console.log(`${this.name} is close`)
  }
}
