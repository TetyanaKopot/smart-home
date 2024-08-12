import { Device } from './device.js'
import {
  renderControlButtons,
  renderPowerController,
} from '../ui/render-elements.js'

export class Boiler extends Device {
  constructor(name, temperature = 50) {
    super(name)
    this.temperature = temperature
  }

  setTemperature(value) {
    this.temperature = value
    console.log(`${this.name} temperature is set to${this.temperature}`)
  }

  getStatus() {
    return {
      isOn: this.isOn,
      temperature: this.temperature,
    }
  }

  render(roomName) {
    return `
      <div class="device">
        <h3 class="device__title">Boiler</h3>
        <i class="fa-brands fa-hotjar"></i>
        ${renderPowerController(40, 60, 50, 'temperature', this.name, roomName)}
        ${renderControlButtons('Boiler', this.name, roomName)}
      </div>
      `
  }
}
