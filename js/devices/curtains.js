import { Door } from './door.js'

export class Curtains extends Door {
  constructor(name, isOpen = false, halfOpen = false) {
    super(name, isOpen)
    this.halfOpen = halfOpen
    this.loadState()
  }

  getIcon() {
    return 'fa-regular fa-window-maximize'
  }

  renderDeviceOptions(roomName) {
    return `<i class="fa-solid fa-circle-half-stroke" id="${roomName}-${this.name}-open-half"></i>`
  }

  loadState() {
    const state = JSON.parse(localStorage.getItem(this.name))
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
    // this.saveState()
  }

  open() {
    super.open()
    this.halfOpen = false
    // this.saveState()
    return this.isOpen
  }

  close() {
    super.close()
    this.halfOpen = false
    // this.saveState()
  }
}
