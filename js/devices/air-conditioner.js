import { Device } from './device.js'
import { renderPowerController } from '../ui/render-elements.js'

export class AirConditioner extends Device {
  constructor(name, tempValue = 20) {
    super(name)
    this.isOn = false
    this.tempValue = tempValue
    this.loadState()
  }

  renderDeviceOptions(roomName) {
    return `${renderPowerController({
      min: 15,
      max: 30,
      value: this.tempValue,
      deviceParam: 'temperature',
      name: this.name,
      roomName,
      unit: '°C',
    })}`
  }

  getIcon() {
    return 'fa-solid fa-fan'
  }

  temperature(value) {
    this.tempValue = value
    console.log(`${this.name} temperature is set to ${this.tempValue}`)
    // this.saveState()
  }

  getStatus() {
    return {
      ...super.getStatus(),
      tempValue: this.tempValue,
    }
  }

  loadState() {
    super.loadState()
    const state = JSON.parse(localStorage.getItem(this.name))
    if (state) {
      this.tempValue = state.tempValue
    }
  }

  off() {
    return super.off()
  }
}
