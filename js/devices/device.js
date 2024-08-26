import { renderControlButtons } from '../ui/render-elements.js'

export class Device {
  constructor(name, roomName) {
    this.name = name
    this.roomName = roomName
    this.isOn = false
    this.hasPower = true
    this.loadState(roomName)
  }

  render(roomName) {
    return `
    <div class="device">
    <h3 class="device__title">${this.name}</h3>
    <i class="${this.getIcon()}"></i>
    ${this.renderDeviceOptions(roomName)}
    <p class="device__status" id="${roomName}-${this.name}-status"></p>
    ${renderControlButtons(this.constructor.name, this.name, roomName)}
    </div>
    `
  }

  getIcon() {
    return 'fa-solid fa-question'
  }

  renderDeviceOptions() {
    return ''
  }

  getStatus() {
    return {
      isOn: this.isOn,
      hasPower: this.hasPower,
    }
  }

  getStorageKey(roomName) {
    return `${roomName}-${this.name}`
  }

  saveState(roomName) {
    const state = this.getStatus()
    localStorage.setItem(this.getStorageKey(roomName), JSON.stringify(state))
  }

  loadState(roomName) {
    const state = JSON.parse(localStorage.getItem(this.getStorageKey(roomName)))
    if (state) {
      this.isOn = state.isOn
    }
  }

  on() {
    this.isOn = true
    console.log(`${this.name} is on`)
    return this.isOn
  }

  off() {
    this.isOn = false
    console.log(`${this.name} is off`)
  }
}
