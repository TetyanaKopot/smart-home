import { controlActions } from '../config.js'
import { setButtonState } from './set-button-state.js'

export const handleOnOffClick = (device, roomName) => {
  const actions = controlActions[device.constructor.name]
  if (actions) {
    const onButton = document.querySelector(
      `#${roomName}-${device.name}-${actions.on}`
    )
    const offButton = document.querySelector(
      `#${roomName}-${device.name}-${actions.off}`
    )

    const updateStatusElement = (message, error) => {
      const statusElement = document.querySelector(
        `#${roomName}-${device.name}-status`
      )
      if (statusElement) {
        statusElement.textContent = message || error
        statusElement.style.color = error ? 'red' : 'green'
      }
    }

    const handleOnClick = () => {
      if (onButton.classList.contains('is-active')) return
      const isOn = device[actions.on]?.(roomName)
      if (isOn) {
        if (openHalfButton) {
          setButtonState(onButton, [offButton, openHalfButton])
        } else {
          setButtonState(onButton, [offButton])
        }
        updateStatusElement(`${device.name} is ${actions.on}ed`)
      } else if (!navigator.onLine) {
        updateStatusElement(
          null,
          `Cannot ${actions.on} ${device.name} due to no internet connection`
        )
        return
      } else if (!device.hasPower) {
        updateStatusElement(
          null,
          `${device.name} cannot be ${actions.on} because it's unplugged`
        )
        return
      }
      // device[actions.on]?.(roomName)
      device.saveState()
    }

    const handleOffClick = () => {
      if (offButton.classList.contains('is-active')) return
      if (!navigator.onLine) {
        updateStatusElement(
          null,
          `Cannot ${actions.off} ${device.name} due to no internet connection`
        )
        return
      }
      if (!device.hasPower) {
        updateStatusElement(
          null,
          `${device.name} cannot be ${actions.off} because it's unplugged`
        )
        return
      }
      device[actions.off]?.(roomName)
      device.saveState()
      updateStatusElement(`${device.name} is ${actions.off}ed`)
      if (openHalfButton) {
        setButtonState(offButton, [onButton, openHalfButton])
      } else {
        setButtonState(offButton, [onButton])
      }
    }

    onButton.addEventListener('click', handleOnClick)
    offButton.addEventListener('click', handleOffClick)

    const openHalfButton = document.querySelector(
      `#${roomName}-${device.name}-open-half`
    )
    openHalfButton?.addEventListener('click', () => {
      if (openHalfButton.classList.contains('is-active')) return
      if (!navigator.onLine) {
        updateStatusElement(
          null,
          `Cannot open ${device.name} halfway due to no internet connection`
        )
        return
      }
      if (!device.hasPower) {
        updateStatusElement(
          null,
          `${device.name} cannot be opened halfway because it's unplugged`
        )
        return
      }
      device.openHalf()
      device.saveState()
      updateStatusElement(`${device.name} is opened halfway`)
      setButtonState(openHalfButton, [onButton, offButton])
    })
  }
}
