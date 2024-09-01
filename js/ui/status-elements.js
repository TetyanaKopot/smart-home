import { controlActions } from '../config.js'
import { formatTime } from '../events/timer.js'

export const updateStatusElement = (message, roomName, device) => {
  const statusElement = document.querySelector(
    `#${roomName}-${device.name}-status`
  )

  if (statusElement) {
    statusElement.textContent = message
  }
}

export const setButtonState = (activeButton, inactiveButtons) => {
  inactiveButtons.forEach((button) => {
    if (button) {
      button.classList.remove('is-active')
      button.disabled = false
    }
  })

  if (activeButton) {
    activeButton.classList.add('is-active')
    activeButton.disabled = true
  }
}

export const updateDeviceStatus = (device, roomName) => {
  const actions = controlActions[device.constructor.name]
  const status = device.getStatus()

  const onButton = document.querySelector(
    `#${roomName}-${device.name}-${actions.on}`
  )
  const offButton = document.querySelector(
    `#${roomName}-${device.name}-${actions.off}`
  )
  const openHalfButton = document.querySelector(
    `#${roomName}-${device.name}-open-half`
  )

  let message
  if (status.halfOpen) {
    message = '`opened halfway`'
  } else {
    message = status.isOn || status.isOpen ? `${actions.on}` : `${actions.off}`
  }
  updateStatusElement(message, roomName, device)

  if (status.halfOpen) {
    setButtonState(openHalfButton, [onButton, offButton])
  } else if (status.isOn || status.isOpen) {
    if (openHalfButton) {
      setButtonState(onButton, [offButton, openHalfButton])
    } else {
      setButtonState(onButton, [offButton])
    }
  } else {
    if (openHalfButton) {
      setButtonState(offButton, [onButton, openHalfButton])
    } else {
      setButtonState(offButton, [onButton])
    }
  }

  const timerElement = document.querySelector(
    `#${roomName}-${device.name}-timer`
  )
  if (timerElement && status.timer) {
    const { hours = 0, minutes = 0, seconds = 0 } = status.timer
    timerElement.innerText = `Timer ${formatTime(hours)} : ${formatTime(
      minutes
    )} : ${formatTime(seconds)}`
  }
}
