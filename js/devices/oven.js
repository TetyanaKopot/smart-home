import { renderTimer, renderPowerController } from '../ui/render-elements.js'
import { AirConditioner } from './air-conditioner.js'
import { initializeTimer, formatTime } from '../events/timer.js'
import { updateDeviceStatus } from '../ui/status-elements.js'

export class Oven extends AirConditioner {
  constructor(name, roomName, tempValue = 180) {
    super(name)
    this.roomName = roomName
    this.tempValue = tempValue
    this.timer = null
  }

  renderDeviceOptions(roomName) {
    const validTempValue =
      typeof this.tempValue === 'number' && !isNaN(this.tempValue)
        ? this.tempValue
        : 180
    return `
    ${renderTimer(this.name, roomName)}
    ${renderPowerController({
      min: 50,
      max: 360,
      value: validTempValue,
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
    this.startTimestamp = Date.now()
    const duration = remainingTime || hours * 3600 + minutes * 60
    this.timer = duration

    this.saveState(roomName)

    this.stopTimer = initializeTimer(
      duration,
      (hrs, mins, secs) => {
        document.querySelector(
          `#${roomName}-${this.name}-timer`
        ).innerText = `Timer ${formatTime(hrs)} : ${formatTime(
          mins
        )} : ${formatTime(secs)}`

        this.saveState(roomName)
      },
      () => {
        this.off(roomName)
        this.saveState(roomName)
      }
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
      startTimestamp: this.startTimestamp,
    }
  }

  loadState(roomName) {
    const state = JSON.parse(localStorage.getItem(this.getStorageKey(roomName)))
    if (state) {
      const { timer, startTimestamp } = state
      const elapsed = Math.floor((Date.now() - startTimestamp) / 1000)

      const remainingTime = Math.max(timer - elapsed, 0)

      if (remainingTime > 0) {
        const hours = Math.floor(remainingTime / 3600)
        const minutes = Math.floor((remainingTime % 3600) / 60)
        this.startTimer(hours, minutes, roomName, remainingTime)

        super.on(roomName)
        this.isOn = true
        localStorage.setItem(
          this.getStorageKey(roomName),
          JSON.stringify({
            ...state,
            isOn: true,
          })
        )
      } else {
        this.off(roomName)
      }

      this.tempValue = state.temperature
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
      const savedState = JSON.parse(localStorage.getItem(storageKey))
      if (savedState && savedState.isOn) {
        this.startTimer(
          savedState.hours || 0,
          savedState.minutes || 0,
          roomName
        )
      } else {
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
      updateDeviceStatus(this, roomName)
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
      updateDeviceStatus(this, roomName)
    }
  }
}
