import { Oven } from './oven.js'
import {
  renderSelectOptions,
  renderTimer,
  renderPowerController,
  renderControlButtons,
} from '../ui/render-elements.js'

const modes = ['Standard', 'Cotton', 'Silk', 'Wool', 'Delicate', 'Quik']
export class WashingMachine extends Oven {
  constructor(name, tempValue = 40, timer, machineModes = modes) {
    super(name, timer)
    this.tempValue = tempValue
    this.timer = null
    this.modes = machineModes || ['Standard']
    this.currentMode = this.modes[0]
    this.isLocked = false
  }

  // setMode(modeIndex, messageLabel) {
  //   if (!this.isOn && !this.isLocked) {
  //     this.currentMode = this.modes[modeIndex]
  //     console.log(`Washing mode set to ${this.currentMode}`)
  //   } else if (this.isLocked) {
  //     console.log('Machine is locked, cannot change mode')
  //     messageLabel.innerText = 'Cannot change mode while machine is running'
  //   } else {
  //     console.log('Machine is on, cannot change mode')
  //   }
  // }

  setMode(modeIndex) {
    if (!this.isOn && !this.isLocked) {
      this.currentMode = this.modes[modeIndex]
      console.log(`Washing mode set to ${this.currentMode}`)
    } else if (this.isLocked) {
      messageLabel.innerText = 'Cannot change mode now'
    }
  }

  start(roomName) {
    if (!this.isLocked) {
      this.isOn = true
      this.isLocked = true
      console.log(`${this.name} started`)
      document.querySelector(`#${roomName}-${this.name}-mode-label`).innerText =
        'Cannot change mode now'
    }
  }

  stop(roomName) {
    this.isOn = false
    this.isLocked = false
    console.log(`${this.name} stoped`)
    document.querySelector(`#${roomName}-${this.name}-mode-label`).innerText =
      'select mode:'
  }

  getStatus() {
    return {
      isOn: this.isOn,
      temperature: this.tempValue,
      timer: this.timer,
      mode: this.currentMode,
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
