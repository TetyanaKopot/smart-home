import { Device } from './device.js'
import {
  renderPowerController,
  renderControlButtons,
} from '../ui/render-elements.js'

export class Light extends Device {
  constructor(name, brightValue = 50, color = 'white') {
    super(name)
    this.brightValue = brightValue
    this.color = color
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

  getIcon() {
    return 'fa-solid fa-lightbulb'
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

  getStatus() {
    return {
      ...super.getStatus(),
      brightness: this.brightValue,
      color: this.color,
    }
  }
}

// setColor(value) {
//   this.color = value
//   console.log(`${this.name} has ${this.color} color`)
// }

// render(roomName) {
//   return `
//   <div class="device ${roomName}">
//     <h3 class="device__title">${this.name}</h3>
//     <i class="fa-solid fa-lightbulb"></i>
//     <div class="light-colors" id="${roomName}-${this.name}-colors">
//       <button class="light-color white is-active" id="${roomName}-white" data-color="white">W</button>
//       <button class="light-color yellow" id="${roomName}-yellow" data-color="yellow">Y</button>
//       <button class="light-color red" id="${roomName}-red" data-color="red">R</button>
//       <button class="light-color green" id="${roomName}-green" data-color="green">G</button>
//       <button class="light-color blue" id="${roomName}-blue" data-color="blue">B</button>
//     </div>
//     ${renderPowerController({
//       min: 0,
//       max: 100,
//       value: this.brightValue,
//       deviceParam: 'brightness',
//       name: this.name,
//       roomName,
//       unit: 'lm',
//     })}
//     ${renderControlButtons('Light', this.name, roomName)}
//   </div>
//       `
// }

// bindEvents(roomName) {
//   document
//     .getElementById(`${roomName}-${this.name}-on`)
//     .addEventListener('click', () => this.turnOn())
//   document
//     .getElementById(`${roomName}-${this.name}-off`)
//     .addEventListener('click', () => this.turnOff())
//   document
//     .getElementById(`${roomName}-${this.name}-brightness`)
//     .addEventListener('input', (event) =>
//       this.setBrightness(event.target.value)
//     )

//   document
//     .getElementById(`${roomName}-white`)
//     .addEventListener('click', () => this.changeColor('white'))
//   document
//     .getElementById(`${roomName}-yellow`)
//     .addEventListener('click', () => this.changeColor('yellow'))
//   document
//     .getElementById(`${roomName}-red`)
//     .addEventListener('click', () => this.changeColor('red'))
//   document
//     .getElementById(`${roomName}-green`)
//     .addEventListener('click', () => this.changeColor('green'))
//   document
//     .getElementById(`${roomName}-blue`)
//     .addEventListener('click', () => this.changeColor('blue'))
// }
