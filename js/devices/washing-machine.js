import { Oven } from './oven.js'
import {
  renderSelectOptions,
  renderTimer,
  renderPowerController,
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
    this.loadState()
  }

  renderDeviceOptions(roomName) {
    return `
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
      })}`
  }

  getIcon() {
    return 'fa-solid fa-soap'
  }

  setMode(modeIndex) {
    if (!this.isLocked) {
      this.currentMode = this.modes[modeIndex]
      console.log(`Washing mode set to ${this.currentMode}`)
    }
    this.saveState()
  }

  updateModeElements(roomName, text, isDisabled) {
    const modeSelectElement = document.querySelector(
      `#${roomName}-${this.name}-mode-select`
    )
    const modeSelectLabel = document.querySelector(
      `#${roomName}-${this.name}-mode-label`
    )
    modeSelectLabel.innerText = text
    modeSelectElement.disabled = isDisabled
    this.saveState()
  }

  getStatus() {
    return {
      ...super.getStatus(),
      mode: this.currentMode,
    }
  }

  loadState() {
    super.loadState()
    const state = JSON.parse(localStorage.getItem(this.name))
    if (state) {
      this.mode = state.mode
    }
  }

  start(roomName) {
    if (!this.isLocked) {
      this.isOn = true
      this.isLocked = true
      const modeSelectElement = document.querySelector(
        `#${roomName}-${this.name}-mode-select`
      )
      const selectedModeIndex = modeSelectElement.selectedIndex
      this.setMode(selectedModeIndex)
      this.updateModeElements(roomName, 'Cannot change mode now', true)
      super.on(roomName)
    }
    this.saveState()
  }

  stop(roomName) {
    this.isOn = false
    this.isLocked = false
    this.updateModeElements(roomName, 'select mode:', false)
    super.off(roomName)
    this.saveState()
  }
}
