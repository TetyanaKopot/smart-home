import { Device } from './device.js'
import { renderPowerController } from '../ui/render-elements.js'

export class Hood extends Device {
  constructor(name, roomName, powValue = 30) {
    super(name)
    this.roomName = roomName
    this.powValue = powValue
  }

  renderDeviceOptions(roomName) {
    return `${renderPowerController({
      min: 0,
      max: 100,
      value: this.powValue,
      deviceParam: 'power',
      name: this.name,
      roomName,
      unit: 'RPM',
    })}`
  }

  getIcon() {
    return 'fa-solid fa-wind'
  }

  power(value) {
    this.powValue = value
    console.log(`${this.name} power is set to${this.powValue}`)
  }

  getStatus() {
    return {
      ...super.getStatus(),
      power: this.powValue,
    }
  }

  loadState(roomName) {
    super.loadState(roomName)
    const state = JSON.parse(localStorage.getItem(this.getStorageKey(roomName)))
    if (state) {
      this.powValue = state.power
    }
  }
}
