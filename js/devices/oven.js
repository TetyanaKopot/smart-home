import { WashingMachine } from './washing-machine.js'
import {
  renderControlButtons,
  renderTimer,
  renderPowerController,
} from '../ui/render-elements.js'

export class Oven extends WashingMachine {
  constructor(name, tempValue = 180) {
    super(name)
    this.tempValue = tempValue
    this.timer = null
  }

  temperature(value) {
    this.tempValue = value
    console.log(`${this.name} temperfture is set to${this.tempValue}`)
  }

  startTimer(hours, minutes, roomName) {
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

  getStatus() {
    return {
      isOn: this.isOn,
      temperature: this.tempValue,
    }
  }

  render(roomName) {
    return `
      <div class="device">
        <h3 class="device__title">${this.name}</h3>
        <i class="fa-solid fa-fire"></i>
       
        ${renderTimer(this.name, roomName)}
        ${renderPowerController({
          min: 50,
          max: 360,
          value: this.tempValue,
          deviceParam: 'temperature',
          name: this.name,
          roomName,
          unit: '°C',
        })}
        ${renderControlButtons('Oven', this.name, roomName)}
      </div>
    `
  }
}
