import { controlActions } from '../app-configs/config.js'
import { updateDeviceStatus } from '../ui/status-elements.js'

export const handleOnOffClick = (device, roomName) => {
  const actions = controlActions[device.constructor.name]
  if (actions) {
    const onButton = document.querySelector(
      `#${roomName}-${device.name}-${actions.on}`
    )
    const offButton = document.querySelector(
      `#${roomName}-${device.name}-${actions.off}`
    )
    const openHalfButton = document.querySelector(
      `#${roomName}-${device.name}-open-half`
    )
    const timerElement = document.querySelector(
      `#${roomName}-${device.name}-timer`
    )
    const hoursElement = document.querySelector(
      `#${roomName}-${device.name}-hours`
    )
    const minutesElement = document.querySelector(
      `#${roomName}-${device.name}-minutes`
    )

    const handleOnClick = () => {
      if (onButton.classList.contains('is-active')) return
      if (typeof device.startTimer === 'function') {
        const hours = parseInt(hoursElement.value) || 0
        const minutes = parseInt(minutesElement.value) || 0

        if (hours === 0 && minutes === 0) {
          timerElement.classList.add('error')
          timerElement.innerText = `Set timer for ${device.name}.`
          return
        } else {
          timerElement.classList.remove('error')
          timerElement.innerText = ''
        }
      }
      device[actions.on]?.(roomName)
      device.saveState(roomName)
      updateDeviceStatus(device, roomName)
    }

    const handleOffClick = () => {
      if (offButton.classList.contains('is-active')) return
      device[actions.off]?.(roomName)

      device.saveState(roomName)
      updateDeviceStatus(device, roomName)
    }

    onButton.addEventListener('click', handleOnClick)
    offButton.addEventListener('click', handleOffClick)

    openHalfButton?.addEventListener('click', () => {
      if (openHalfButton.classList.contains('is-active')) return
      device.openHalf()
      device.saveState(roomName)
      updateDeviceStatus(device, roomName)
    })
  }
}
