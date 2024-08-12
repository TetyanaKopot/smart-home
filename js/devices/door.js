import { Device } from './device.js'
import { renderControlButtons } from '../ui/render-elements.js'

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

  render(roomName) {
    return `
    <div class="device">
      <h3 class="device__title">Door</h3>
        <i class="fa-solid fa-door-open"></i> 
      ${renderControlButtons('Door', this.name, roomName)}
    </div>
    `
  }
}
