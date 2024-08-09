import { Device } from '../app.mjs'

export class AirConditioner extends Device {
  constructor(name, temperature = 20) {
    super(name)
    this.temperature = temperature
  }

  setTemperature(value) {
    this.temperature = value
    console.log(`${this.name} temperature is set to${this.temperature}`)
  }
}
