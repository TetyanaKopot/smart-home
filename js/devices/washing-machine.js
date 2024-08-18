import { Oven } from './oven.js'
import {
  renderSelectOptions,
  renderTimer,
  renderPowerController,
  renderControlButtons,
} from '../ui/render-elements.js'

const modes = ['Standard', 'Cotton', 'Silk', 'Wool', 'Delicate', 'Quik']
export class WashingMachine extends Oven {
  constructor(name, tempValue = 40, timer) {
    super(name, timer)
    this.tempValue = tempValue
    this.modes = modes
    this.currentMode = modes[0]
  }

  setMode(mode) {
    if (this.modes.includes(mode)) {
      this.currentMode = mode
      console.log(`Washing mode set to ${this.currentMode}`)
    } else {
      console.log('Invalid washing mode')
    }
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
       ${renderSelectOptions(roomName, this.name, modes, 'mode')}
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
