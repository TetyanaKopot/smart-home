import { Device } from './device.js'
import {
  renderControlButtons,
  renderTimer,
  renderPowerController,
} from '../ui/render-elements.js'

export class WashingMachine extends Device {
  constructor(name, tempValue = 40) {
    super(name)
    this.tempValue = tempValue
    this.timer = null
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
       <i class="fa-solid fa-soap"></i>
      ${renderTimer(this.name, roomName)}
      ${renderPowerController({
        min: 0,
        max: 90,
        value: this.tempValue,
        deviceParam: 'temperature',
        name: this.name,
        roomName,
        unit: '°C',
      })}
      ${renderControlButtons('WashingMachine', this.name, roomName)}
    </div>
  `
  }
}
