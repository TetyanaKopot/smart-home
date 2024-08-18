import { Door } from './door.js'
import { renderControlButtons } from '../ui/render-elements.js'

export class Curtains extends Door {
  constructor(name, halfOpen = false) {
    super(name)
    this.halfOpen = halfOpen
  }

  openHalf() {
    this.halfOpen = true
    console.log(`${this.name} is open half`)
  }

  getStatus() {
    return {
      isOn: this.isOn,
      halfOpen: this.halfOpen,
    }
  }

  render(roomName) {
    return `
    <div class="device">
      <h3 class="device__title">${this.name}</h3>
      <i class="fa-regular fa-window-maximize"></i> 
      <i class="fa-solid fa-circle-half-stroke" id="${roomName}-${
      this.name
    }-open-half"></i>
      ${renderControlButtons('Curtains', this.name, roomName)}
    </div>
    `
  }
}
