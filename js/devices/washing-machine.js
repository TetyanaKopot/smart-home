import { Device } from './device.js'
import {
  renderControlButtons,
  renderTimer,
  renderPowerController,
} from '../ui/render-elements.js'

export class WashingMachine extends Device {
  constructor(name, temperature = 40) {
    super(name)
    this.temperature = temperature
    this.timer = null
  }

  setTemperature(value) {
    this.temperature = value
  }

  startTimer(hours, minutes) {
    let timeInSeconds = hours * 60 * 60 + minutes * 60

    this.timer = setInterval(() => {
      if (timeInSeconds > 0) {
        timeInSeconds--

        const hrs = Math.floor(timeInSeconds / 3600)
        const mins = Math.floor((timeInSeconds % 3600) / 60)
        const secs = Math.floor(timeInSeconds % 60)

        document.querySelector(
          `#${roomName}-${this.name}-timer`
        ).innerText = `Timer ${this.formatTime(hrs)} : ${this.formatTime(
          mins
        )} : ${this.formatTime(secs)}`
      } else {
        clearInterval(this.timer)
      }
    }, 1000)
  }
  formatTime(value) {
    return value < 10 ? `0${value}` : value
  }

  render(roomName) {
    return `
      <div class="device">
        <h3 class="device__title">Washing Machine</h3>
        <i class="fa-solid fa-soap"></i>
        ${renderTimer(this.name, roomName)}
        ${renderPowerController(0, 90, 40, 'temperature', this.name, roomName)}
        ${renderControlButtons('off', 'on', this.name, roomName)}
      </div>
    `
  }
}
