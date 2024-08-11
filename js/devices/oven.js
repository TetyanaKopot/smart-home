import { WashingMachine } from './washing-machine.js'
import {
  renderControlButtons,
  renderTimer,
  renderPowerController,
} from '../ui/render-elements.js'

export class Oven extends WashingMachine {
  constructor(name, temperature = 180) {
    super(name)
    this.temperature = temperature
    this.timer = null
  }

  render(roomName) {
    return `
    <div class="device">
      <h3 class="device__title">Oven</h3>
      <i class="fa-solid fa-fire"></i>
      ${renderTimer(this.name, roomName)}
      ${renderPowerController(50, 360, 180, 'temperature', this.name, roomName)}
      ${renderControlButtons('off', 'on', this.name, roomName)}
    </div>
  `
  }
}
