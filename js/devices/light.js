import { Device } from './device.js'
import { renderPowerController } from '../ui/render-elements.js'

export class Light extends Device {
  constructor(name, brightValue = 50, color = 'white') {
    super(name)
    this.brightValue = brightValue
    this.color = color
    this.loadState()
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
      // this.saveState()
    }
  }

  changeColor(newColor) {
    const allowedColors = ['white', 'yellow', 'red', 'green', 'blue']
    if (allowedColors.includes(newColor)) {
      this.color = newColor
      console.log(`${this.name} change ${this.color} color`)
      // this.saveState()
    }
  }

  getStatus() {
    return {
      ...super.getStatus(),
      brightValue: this.brightValue,
      color: this.color,
    }
  }

  loadState() {
    super.loadState()
    const state = JSON.parse(localStorage.getItem(this.name))
    if (state) {
      this.brightValue = state.brightValue
      this.color = state.color
    }
  }
}
