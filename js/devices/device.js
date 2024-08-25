import { renderControlButtons } from '../ui/render-elements.js'

export class Device {
  constructor(name) {
    this.name = name
    this.isOn = false
    this.loadState()
  }

  render(roomName) {
    return `
    <div class="device">
    <h3 class="device__title">${this.name}</h3>
    <i class="${this.getIcon()}"></i>
    ${this.renderDeviceOptions(roomName)}
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
    console.log(`${this.name} is turned on`)
    this.saveState()
  }

  off() {
    this.isOn = false
    console.log(`${this.name} is turned off`)
    this.saveState()
  }
}
