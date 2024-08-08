import { Device } from './baseClassOfDevice'

export class AirConditioner extends Device {
  constructor(name, temperature = 20) {
    super(name, isOn)
    this.temperature = temperature
  }

  setTemperature(value) {
    this.temperature = value
    console.log(`${this.name} temperature is set to${this.temperature}`)
  }
}
