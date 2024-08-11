import { Device } from './device.js'
import {
  renderPowerController,
  renderControlButtons,
} from '../ui/render-elements.js'

export class Light extends Device {
  constructor(name, brightness = 50, color = 'white') {
    super(name)
    this.brightness = brightness
    this.color = color
  }

  setBrightness(value) {
    if (value > 0 && value < 100) {
      this.brightness = value
      console.log(`${this.name} brightness is set to ${this.brightness}`)
    } else {
      console.log('Brightness sould be between 0 and 100')
    }
  }

  setColor(value) {
    this.color = value
    console.log(`${this.name} has ${this.color} color`)
  }

  changeColor(newColor) {
    const allowedColors = ['white', 'yellow', 'red', 'green', 'blue']
    if (allowedColors.includes(newColor)) {
      this.color = newColor
    }
  }

  getStatus() {
    return {
      isOn: this.isOn,
      brightness: this.brightness,
      color: this.color,
    }
  }

  render(roomName) {
    return `
    <div class="device">
    <h3 class="device__title">${this.name}</h3>
    <i class="fa-solid fa-lightbulb"></i>      
    <div class="light-colors">
    <button class="light-color white" id="${roomName}-white">W</button>
    <button class="light-color yellow" id="${roomName}-yellow">Y</button>
    <button class="light-color red" id="${roomName}-red">R</button>
    <button class="light-color green" id="${roomName}-green">G</button>
          <button class="light-color blue" id="${roomName}-blue">B</button>
        </div>
        ${renderPowerController(
          0,
          100,
          this.brightness,
          'brightness',
          this.name,
          roomName
        )}
        ${renderControlButtons('Off', 'On', this.name, roomName)}   
        </div>
        `
  }

  bindEvents(roomName) {
    document
      .getElementById(`${roomName}-${this.name}-on`)
      .addEventListener('click', () => this.turnOn())
    document
      .getElementById(`${roomName}-${this.name}-off`)
      .addEventListener('click', () => this.turnOff())
    document
      .getElementById(`${roomName}-${this.name}-brightness`)
      .addEventListener('input', (event) =>
        this.setBrightness(event.target.value)
      )

    document
      .getElementById(`${roomName}-white`)
      .addEventListener('click', () => this.changeColor('white'))
    document
      .getElementById(`${roomName}-yellow`)
      .addEventListener('click', () => this.changeColor('yellow'))
    document
      .getElementById(`${roomName}-red`)
      .addEventListener('click', () => this.changeColor('red'))
    document
      .getElementById(`${roomName}-green`)
      .addEventListener('click', () => this.changeColor('green'))
    document
      .getElementById(`${roomName}-blue`)
      .addEventListener('click', () => this.changeColor('blue'))
  }
}
