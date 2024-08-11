import { Door } from './door.js'
import { renderControlButtons } from '../ui/render-elements.js'

export class Curtains extends Door {
  constructor(name, isOpen = false, halfOpen = false) {
    super(name, isOpen)
    this.halfOpen = halfOpen
  }

  openHalf() {
    this.halfOpen = true
  }

  render(roomName) {
    return `
    <div class="device">
      <h3 class="device__title">Curtains</h3>
      <i class="fa-regular fa-window-maximize"></i> 
      <i class="fa-solid fa-circle-half-stroke"></i>
      ${renderControlButtons('close', 'open', this.name, roomName)}
    </div>
    `
  }
}
