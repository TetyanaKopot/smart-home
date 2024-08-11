import { Device } from './device.js'
import {
  renderControlButtons,
  renderPowerController,
} from '../ui/render-elements.js'

export class AirConditioner extends Device {
  constructor(name, temperature = 20) {
    super(name)
    this.temperature = temperature
  }

  setTemperature(value) {
    this.temperature = value
    console.log(`${this.name} temperature is set to${this.temperature}`)
  }

  render(roomName) {
    return `
    <div class="device">
      <h3 class="device__title">AC</h3>
      <i class="fa-solid fa-fan"></i>
      ${renderPowerController(15, 30, 22, 'temperature', this.name, roomName)}
      ${renderControlButtons('off', 'on', this.name, roomName)}
    </div>
    `
  }
}
