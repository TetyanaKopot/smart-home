import { renderTimer, renderPowerController } from '../ui/render-elements.js'
import { AirConditioner } from './air-conditioner.js'
import { setButtonState } from '../ui/status-elements.js'
import { initializeTimer, formatTime } from '../events/timer.js'

export class Oven extends AirConditioner {
  constructor(name, roomName, tempValue = 180) {
    super(name)
    this.roomName = roomName
    this.tempValue = tempValue
    this.timer = null
    this.stopTimer = null
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

  startTimer(hours, minutes, roomName, remainingTime = null) {
    const storageKey = `${roomName}-${this.name}-remaining-time`
    const duration = remainingTime || hours * 3600 + minutes * 60

    this.stopTimer = initializeTimer(
      duration,
      (hrs, mins, secs) => {
        document.querySelector(
          `#${roomName}-${this.name}-timer`
        ).innerText = `Timer ${formatTime(hrs)} : ${formatTime(
          mins
        )} : ${formatTime(secs)}`

        // Збереження залишкового часу в localStorage
        localStorage.setItem(
          storageKey,
          JSON.stringify(hrs * 3600 + mins * 60 + secs)
        )
      },
      () => {
        this.off(roomName)
        this.saveState(roomName)
        localStorage.removeItem(storageKey) // Видалення після завершення
      },
      storageKey // Передаємо ключ збереження в таймер
    )
  }

  canBeTurnedOn(roomName) {
    const hoursElement = document.querySelector(
      `#${roomName}-${this.name}-hours`
    )
    const minutesElement = document.querySelector(
      `#${roomName}-${this.name}-minutes`
    )
    const hours = parseInt(hoursElement.value) || 0
    const minutes = parseInt(minutesElement.value) || 0

    return hours > 0 || minutes > 0
  }

  getStatus() {
    return {
      ...super.getStatus(),
      timer: this.timer,
    }
  }

  loadState(roomName) {
    super.loadState()
    const storageKey = `${roomName}-${this.name}-remaining-time`
    const remainingTime = JSON.parse(localStorage.getItem(storageKey))

    if (remainingTime) {
      const hours = Math.floor(remainingTime / 3600)
      const minutes = Math.floor((remainingTime % 3600) / 60)
      this.startTimer(hours, minutes, roomName, remainingTime)
    }
  }

  on(roomName) {
    if (this.canBeTurnedOn(roomName)) {
      const hoursElement = document.querySelector(
        `#${roomName}-${this.name}-hours`
      )
      const minutesElement = document.querySelector(
        `#${roomName}-${this.name}-minutes`
      )

      const hours = parseInt(hoursElement.value) || 0
      const minutes = parseInt(minutesElement.value) || 0

      const storageKey = `${roomName}-${this.name}-remaining-time`
      const remainingTime = JSON.parse(localStorage.getItem(storageKey))
      if (remainingTime) {
        // Якщо значення не null, запускаємо таймер з залишковим часом
        this.startTimer(0, 0, roomName, remainingTime)
      } else {
        // Якщо таймер не був збережений, запускаємо з початковим часом
        this.startTimer(hours, minutes, roomName)
      }

      hoursElement.value = 0
      minutesElement.value = 0
      const timerElement = document.querySelector(
        `#${roomName}-${this.name}-timer`
      )
      timerElement.classList.remove('error')
      timerElement.innerText = ''
      super.on(roomName)
    } else {
      const timerElement = document.querySelector(
        `#${roomName}-${this.name}-timer`
      )
      timerElement.classList.add('error')
      timerElement.innerText = `Set timer for ${this.name}.`
    }
  }

  off(roomName) {
    if (this.stopTimer) {
      this.stopTimer()
      this.stopTimer = null
      const timerElement = document.querySelector(
        `#${roomName}-${this.name}-timer`
      )
      timerElement.innerText = 'Timer 00 : 00 : 00'
      super.off(roomName)

      const onButton = document.querySelector(`#${roomName}-${this.name}-on`)
      const offButton = document.querySelector(`#${roomName}-${this.name}-off`)

      setButtonState(offButton, [onButton])
    }
  }
}

// off(roomName) {
//   if (this.timer) {
//     clearInterval(this.timer)
//     this.timer = null
//     const timerElement = document.querySelector(
//       `#${roomName}-${this.name}-timer`
//     )
//     timerElement.innerText = 'Timer 00 : 00 : 00'
//     super.off(roomName)

//     const onButton = document.querySelector(`#${roomName}-${this.name}-on`)
//     const offButton = document.querySelector(`#${roomName}-${this.name}-off`)

//     setButtonState(offButton, [onButton])
//   }
// }

// startTimer(hours, minutes, roomName) {
//   let timeInSeconds = hours * 60 * 60 + minutes * 60

//   this.timer = setInterval(() => {
//     if (timeInSeconds > 0) {
//       timeInSeconds--

//       const hrs = Math.floor(timeInSeconds / 3600)
//       const mins = Math.floor((timeInSeconds % 3600) / 60)
//       const secs = Math.floor(timeInSeconds % 60)

//       document.querySelector(
//         `#${roomName}-${this.name}-timer`
//       ).innerText = `Timer ${this.formatTime(hrs)} : ${this.formatTime(
//         mins
//       )} : ${this.formatTime(secs)}`
//     } else {
//       clearInterval(this.timer)
//       this.off(roomName)
//     }
//   }, 1000)
// }

// formatTime(value) {
//   return value < 10 ? `0${value}` : value
// }
// on(roomName) {
//   const timerElement = document.querySelector(
//     `#${roomName}-${this.name}-timer`
//   )
//   const hoursElement = document.querySelector(
//     `#${roomName}-${this.name}-hours`
//   )
//   const minutesElement = document.querySelector(
//     `#${roomName}-${this.name}-minutes`
//   )

//   const hours = parseInt(hoursElement.value) || 0
//   const minutes = parseInt(minutesElement.value) || 0

//   if (hours > 0 || minutes > 0) {
//     this.startTimer(hours, minutes, roomName)
//     hoursElement.value = 0
//     minutesElement.value = 0
//     timerElement.classList.remove('error')
//     timerElement.innerText = ''
//     super.on(roomName)
//   } else {
//     timerElement.classList.add('error')
//     timerElement.innerText = `Set timer for ${this.name}.`
//   }
// }
