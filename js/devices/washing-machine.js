import Device from './device.js'

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

        document.querySelector('#timer').innerText = `Timer ${this.formatTime(
          hrs
        )} : ${this.formatTime(mins)} : ${this.formatTime(secs)}`
      } else {
        clearInterval(this.timer)
      }
    }, 1000)
  }
  formatTime(value) {
    return value < 10 ? `0${value}` : value
  }
}
