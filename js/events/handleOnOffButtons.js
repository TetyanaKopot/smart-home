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

    const handleOnClick = () => {
      if (onButton.classList.contains('is-active')) return
      device[actions.on]?.(roomName)
      if (openHalfButton) {
        setButtonState(onButton, [offButton, openHalfButton])
      } else {
        setButtonState(onButton, [offButton])
      }
    }

    const handleOffClick = () => {
      if (offButton.classList.contains('is-active')) return
      device[actions.off]?.(roomName)
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
      device.openHalf()

      setButtonState(openHalfButton, [onButton, offButton])
    })
  }
}
