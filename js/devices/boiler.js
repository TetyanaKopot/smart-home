import { AirConditioner } from './air-conditioner.js'

export class Boiler extends AirConditioner {
  constructor(name, temperature = 50) {
    super(name, temperature)
  }
}
