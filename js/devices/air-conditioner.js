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
      <h3 class="device__title">${this.name}</h3>
      <i class="fa-solid fa-fan"></i>
      ${renderPowerController({
        min: 15,
        max: 30,
        value: this.tempValue,
        deviceParam: 'temperature',
        name: this.name,
        roomName,
        unit: '°C',
      })}
      ${renderControlButtons('AirConditioner', this.name, roomName)}
    </div>
    `
  }
}
