import { Device } from './device.js'

export class Hood extends Device {
  constructor(name, power = 30) {
    super(name)
    this.power = power
  }

  setPower(value) {
    this.power = value
  }
}
