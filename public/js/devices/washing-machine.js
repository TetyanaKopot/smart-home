import { Oven } from './oven.js'
import {
  renderSelectOptions,
  renderTimer,
  renderPowerController,
  getValidValue,
} from '../ui/render-elements.js'
import { updateDeviceStatus } from '../ui/status-elements.js'

const modes = ['Standard', 'Cotton', 'Silk', 'Wool', 'Delicate', 'Quik']
export class WashingMachine extends Oven {
  constructor(name, roomName, tempValue = 40, timer) {
    super(name, timer)
    this.roomName = roomName
    this.tempValue = tempValue
    this.timer = null
    this.modes = modes || ['Standard']
    this.currentMode = this.modes[0]
    this.isLocked = false
  }

  renderDeviceOptions(roomName) {
    const validTempValue = getValidValue(this.tempValue, 40)
    return `
    ${renderSelectOptions(roomName, this.name, modes, 'mode')}
    ${renderTimer(this.name, roomName)}
    ${renderPowerController({
      min: 0,
      max: 90,
      value: validTempValue,
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
    }
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
  }

  getStatus() {
    return {
      ...super.getStatus(),
      mode: this.currentMode,
    }
  }

  loadState(roomName) {
    super.loadState(roomName)
    const state = JSON.parse(localStorage.getItem(this.getStorageKey(roomName)))

    if (state) {
      // console.log(state)
      this.tempValue = state.tempValue || this.tempValue
      this.currentMode = state.mode || this.modes[0]
      this.updateModeElements(roomName, 'Cannot change now', this.isOn)

      const modeSelectElement = document.querySelector(
        `#${roomName}-${this.name}-mode-select`
      )
      if (modeSelectElement) {
        modeSelectElement.value = this.currentMode
      }
    }
  }

  on(roomName) {
    super.on(roomName)
    const modeSelectElement = document.querySelector(
      `#${roomName}-${this.name}-mode-select`
    )
    const selectedModeIndex = modeSelectElement.selectedIndex
    this.setMode(selectedModeIndex)
    this.updateModeElements(roomName, 'Cannot change now', true)
    this.isLocked = true
    updateDeviceStatus(this, roomName)
  }

  off(roomName) {
    super.off(roomName)
    this.isLocked = false
    this.updateModeElements(roomName, 'select mode:', false)
    updateDeviceStatus(this, roomName)
  }
}
