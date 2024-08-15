import { WashingMachine } from './washing-machine.js'
import {
  renderControlButtons,
  renderTimer,
  renderPowerController,
} from '../ui/render-elements.js'

export class Oven extends WashingMachine {
  constructor(name, tempValue = 180) {
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
      <h3 class="device__title">Oven</h3>
      <i class="fa-solid fa-fire"></i>
      ${renderTimer(this.name, roomName)}
      ${renderPowerController({
        min: 50,
        max: 360,
        value: this.tempValue,
        deviceParam: 'temperature',
        name: this.name,
        roomName,
        unit: '°C',
      })}
      ${renderControlButtons('Oven', this.name, roomName)}
    </div>
  `
  }
}
