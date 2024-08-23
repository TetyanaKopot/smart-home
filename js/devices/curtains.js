import { Door } from './door.js'
import { renderControlButtons } from '../ui/render-elements.js'

export class Curtains extends Door {
  constructor(name, isOpen = false, halfOpen = false) {
    super(name, isOpen)
    this.halfOpen = halfOpen
  }

  openHalf() {
    this.halfOpen = true
    console.log(`${this.name} is open half`)
  }

  getIcon() {
    return 'fa-regular fa-window-maximize'
  }

  renderDeviceOptions(roomName) {
    return `<i class="fa-solid fa-circle-half-stroke" id="${roomName}-${this.name}-open-half"></i>`
  }

  getStatus() {
    return {
      ...super.getStatus(),
      halfOpen: this.halfOpen,
    }
  }
}
