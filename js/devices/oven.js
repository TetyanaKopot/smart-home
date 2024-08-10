import { WashingMachine } from './washing-machine'

export class Oven extends WashingMachine {
  constructor(name, temperature = 180) {
    super(name)
    this.temperature = temperature
    this.timer = null
  }
}
