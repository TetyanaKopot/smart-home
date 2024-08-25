import { renderControlButtons } from '../ui/render-elements.js'

export class Device {
  constructor(name) {
    this.name = name
    this.isOn = false
    this.hasPower = true
    this.loadState()
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

  saveState() {
    const state = this.getStatus()
    localStorage.setItem(this.name, JSON.stringify(state))
  }

  loadState() {
    const state = JSON.parse(localStorage.getItem(this.name))
    if (state) {
      this.isOn = state.isOn
    }
  }

  on() {
    this.isOn = true
    this.saveState()
    return this.isOn
  }

  off() {
    this.isOn = false
    this.saveState()
  }
}
