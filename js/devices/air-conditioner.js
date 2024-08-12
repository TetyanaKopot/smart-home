import { Device } from './device.js'
import {
  renderControlButtons,
  renderPowerController,
} from '../ui/render-elements.js'

export class AirConditioner extends Device {
  constructor(name, tempValue = 20) {
    super(name)
    this.tempValue = tempValue
  }

  temperature(value) {
    this.tempValue = value
    console.log(`${this.name} temperature is set to${this.tempValue}`)
  }

  getStatus() {
    return {
      isOn: this.isOn,
      temperature: this.tempValue,
    }
  }

  render(roomName) {
    return `
    <div class="device">
      <h3 class="device__title">AC</h3>
      <i class="fa-solid fa-fan"></i>
      ${renderPowerController(
        15,
        30,
        this.tempValue,
        'temperature',
        this.name,
        roomName
      )}
      ${renderControlButtons('AirConditioner', this.name, roomName)}
    </div>
    `
  }
}
