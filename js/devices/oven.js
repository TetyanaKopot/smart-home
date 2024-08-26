import { renderTimer, renderPowerController } from '../ui/render-elements.js'
import { AirConditioner } from './air-conditioner.js'
import { setButtonState } from '../events/set-button-state.js'

export class Oven extends AirConditioner {
  constructor(name, tempValue = 180) {
    super(name)
    this.tempValue = tempValue
    this.timer = null
    this.loadState()
  }

  renderDeviceOptions(roomName) {
    return `
    ${renderTimer(this.name, roomName)}
    ${renderPowerController({
      min: 50,
      max: 360,
      value: this.tempValue,
      deviceParam: 'temperature',
      name: this.name,
      roomName,
      unit: '°C',
    })}`
  }

  getIcon() {
    return 'fa-solid fa-fire'
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
        this.off(roomName)
      }
    }, 1000)
    // this.saveState()
  }

  formatTime(value) {
    return value < 10 ? `0${value}` : value
  }

  getStatus() {
    return {
      ...super.getStatus(),
      timer: this.timer,
    }
  }

  loadState() {
    super.loadState()
    const state = JSON.parse(localStorage.getItem(this.name))
    if (state) {
      this.timer = state.timer
    }
  }

  on(roomName) {
    const timerElement = document.querySelector(
      `#${roomName}-${this.name}-timer`
    )
    const hoursElement = document.querySelector(
      `#${roomName}-${this.name}-hours`
    )
    const minutesElement = document.querySelector(
      `#${roomName}-${this.name}-minutes`
    )

    const getHours = () => parseInt(hoursElement.value) || 0
    const getMinutes = () => parseInt(minutesElement.value) || 0
    const hours = getHours()
    const minutes = getMinutes()

    if (hours > 0 || minutes > 0) {
      this.startTimer(hours, minutes, roomName)
      hoursElement.value = 0
      minutesElement.value = 0
      timerElement.classList.remove('error')
      timerElement.innerText = ''
      super.on(roomName)
    } else {
      timerElement.classList.add('error')
      timerElement.innerText = `Set timer for ${this.name}.`
    }
    // this.saveState()
    // return this.isOn
  }

  off(roomName) {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
      const timerElement = document.querySelector(
        `#${roomName}-${this.name}-timer`
      )
      timerElement.innerText = 'Timer 00 : 00 : 00'
      super.off(roomName)

      const onButton = document.querySelector(`#${roomName}-${this.name}-on`)
      const offButton = document.querySelector(`#${roomName}-${this.name}-off`)

      setButtonState(offButton, [onButton])
    }
    // this.saveState()
  }
}
