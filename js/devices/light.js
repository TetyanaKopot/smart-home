import { Device } from './device.js'
import { renderPowerController } from '../ui/render-elements.js'

export class Light extends Device {
  constructor(name, roomName, brightValue = 50, color = 'white') {
    super(name)
    this.roomName = roomName
    this.brightValue = brightValue
    this.color = color
  }

  renderDeviceOptions(roomName) {
    return `
    <div class="light-colors" id="${roomName}-${this.name}-colors">
    <button class="light-color white is-active" id="${roomName}-white" data-color="white">W</button>
    <button class="light-color yellow" id="${roomName}-yellow" data-color="yellow">Y</button>
    <button class="light-color red" id="${roomName}-red" data-color="red">R</button>
    <button class="light-color green" id="${roomName}-green" data-color="green">G</button>
    <button class="light-color blue" id="${roomName}-blue" data-color="blue">B</button>
    </div>
    ${renderPowerController({
      min: 0,
      max: 100,
      value: this.brightValue,
      deviceParam: 'brightness',
      name: this.name,
      roomName,
      unit: 'lm',
    })}`
  }

  getIcon() {
    return 'fa-solid fa-lightbulb'
  }

  brightness(value) {
    if (value > 0 && value < 100) {
      this.brightValue = value
      console.log(`${this.name} brightness is set to ${this.brightValue}`)
    }
  }

  changeColor(newColor) {
    const allowedColors = ['white', 'yellow', 'red', 'green', 'blue']
    if (allowedColors.includes(newColor)) {
      this.color = newColor
      console.log(`${this.name} change ${this.color} color`)
    }
  }

  getStatus() {
    return {
      ...super.getStatus(),
      brightness: this.brightValue,
      color: this.color,
    }
  }

  loadState(roomName) {
    super.loadState(roomName)
    const state = JSON.parse(localStorage.getItem(this.getStorageKey(roomName)))
    if (state) {
      this.brightValue = state.brightness
      this.color = state.color
    }
  }
}
