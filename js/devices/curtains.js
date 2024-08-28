import { Door } from './door.js'

export class Curtains extends Door {
  constructor(name, roomName, isOpen = false, halfOpen = false) {
    super(name, isOpen)
    this.roomName = roomName
    this.halfOpen = halfOpen
  }

  getIcon() {
    return 'fa-regular fa-window-maximize'
  }

  renderDeviceOptions(roomName) {
    return `<i class="fa-solid fa-circle-half-stroke" id="${roomName}-${this.name}-open-half"></i>`
  }

  loadState(roomName) {
    const state = JSON.parse(localStorage.getItem(this.getStorageKey(roomName)))
    if (state) {
      this.halfOpen = state.halfOpen
    }
  }

  getStatus() {
    return {
      ...super.getStatus(),
      halfOpen: this.halfOpen,
    }
  }

  openHalf() {
    this.halfOpen = true
    this.isOpen = false
    console.log(`${this.name} is open half`)
  }

  open() {
    super.open()
    this.halfOpen = false
    return this.isOpen
  }

  close() {
    super.close()
    this.halfOpen = false
  }
}
