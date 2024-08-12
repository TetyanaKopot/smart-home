import { Device } from './device.js'
import {
  renderPowerController,
  renderControlButtons,
} from '../ui/render-elements.js'

export class Hood extends Device {
  constructor(name, power = 30) {
    super(name)
    this.power = power
  }

  setPower(value) {
    this.power = value
  }

  render(roomName) {
    return `
    <div class="device">
      <h3 class="device__title">Hood</h3>
      <i class="fa-solid fa-wind"></i>
      ${renderPowerController(0, 100, 30, 'power', this.name, roomName)}
      ${renderControlButtons('Hood', this.name, roomName)}
    </div>
    `
  }
}
