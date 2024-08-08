import { Device } from './baseClassOfDevice'

export class Light extends Device {
  constructor(name, brightness = 100, color = 'white') {
    super(name, isOn)
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
