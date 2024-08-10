import { Device } from './device.js'

export class Light extends Device {
  constructor(name, brightness = 100, color = 'white') {
    super(name)
    this.brightness = brightness
    this.color = color
  }

  setBrightness(value) {
    this.brightness = value
    console.log(`${this.name} brightness is set to ${this.brightness}`)
  }

  setColor(value) {
    this.color = value
    console.log(`${this.name} has ${this.color} color`)
  }
}
// document.addEventListener('DOMContentLoaded', () => {
//   const lightOn = document.querySelector('#light-on')
//   console.log(lightOn)
// Тут можна підключати кнопку до дії
// })
// const livingRoomLight = new Light('Living Room Light')
// const lightOn = document.querySelector('#light-on')
// console.log(lightOn)
