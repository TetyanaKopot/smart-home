import { renderTimer, renderPowerController } from '../ui/render-elements.js'
import { AirConditioner } from './air-conditioner.js'

export class Oven extends AirConditioner {
  constructor(name, tempValue = 180) {
    super(name)
    this.tempValue = tempValue
    this.timer = null
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
      const onButton = document.querySelector(`#${roomName}-${this.name}-on`)
      const offButton = document.querySelector(`#${roomName}-${this.name}-off`)
      console.log(offButton)
      console.log(onButton)

      onButton.classList.add('is-active')
      onButton.disabled = true
      offButton.disabled = false
      hoursElement.value = 0
      minutesElement.value = 0
      timerElement.classList.remove('error')
      timerElement.innerText = ''
      super.on()
    } else {
      timerElement.classList.add('error')
      timerElement.innerText = `Set timer for ${this.name}, please`
      // const onButton = document.querySelector(`#${roomName}-${this.name}-on`)
      // const offButton = document.querySelector(`#${roomName}-${this.name}-off`)
      // onButton.disabled = true
      // offButton.disabled = true
      return
    }
  }

  off(roomName) {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
      const timerElement = document.querySelector(
        `#${roomName}-${this.name}-timer`
      )
      timerElement.innerText = 'Timer 00 : 00 : 00'
      super.off()
    }
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
        this.off()
      }
    }, 1000)
  }

  formatTime(value) {
    return value < 10 ? `0${value}` : value
  }

  getIcon() {
    return 'fa-solid fa-fire'
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
}

// temperature(value) {
//   this.tempValue = value
//   console.log(`${this.name} temperfture is set to${this.tempValue}`)
// }

// getStatus() {
//   return {
//     isOn: this.isOn,
//     temperature: this.tempValue,
//   }
// }

// render(roomName) {
//   return `
//     <div class="device">
//       <h3 class="device__title">${this.name}</h3>
//       <i class="fa-solid fa-fire"></i>

//       ${renderTimer(this.name, roomName)}
//       ${renderPowerController({
//         min: 50,
//         max: 360,
//         value: this.tempValue,
//         deviceParam: 'temperature',
//         name: this.name,
//         roomName,
//         unit: '°C',
//       })}
//       ${renderControlButtons('Oven', this.name, roomName)}
//     </div>
//   `
// }
