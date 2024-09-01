import { Device } from './device.js'
import { renderPowerController } from '../ui/render-elements.js'

export class AirConditioner extends Device {
  constructor(name, roomName, tempValue = 20) {
    super(name)
    this.roomName = roomName
    this.isOn = false
    this.tempValue = tempValue
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
  }

  getStatus() {
    return {
      ...super.getStatus(),
      temperature: this.tempValue,
    }
  }

  loadState(roomName) {
    super.loadState(roomName)
    const state = JSON.parse(localStorage.getItem(this.getStorageKey(roomName)))
    if (state) {
      this.tempValue = state.temperature
    }
  }

  off() {
    return super.off()
  }
}
