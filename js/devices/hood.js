import { Device } from './device.js'
import { renderPowerController } from '../ui/render-elements.js'

export class Hood extends Device {
  constructor(name, powValue = 30) {
    super(name)
    this.powValue = powValue
    this.loadState()
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
    this.saveState()
  }

  getStatus() {
    return {
      ...super.getStatus(),
      powValue: this.powValue,
    }
  }

  loadState() {
    super.loadState()
    const state = JSON.parse(localStorage.getItem(this.name))
    if (state) {
      this.powValue = state.powValue
    }
  }
}
