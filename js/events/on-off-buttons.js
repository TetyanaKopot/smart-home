import { controlActions } from '../config.js'

export const handleOnOffClick = (device, roomName) => {
  const actions = controlActions[device.constructor.name]
  if (actions) {
    const timerElement = document.querySelector(
      `#${roomName}-${device.name}-timer`
    )
    const hoursElement = document.querySelector(
      `#${roomName}-${device.name}-hours`
    )
    const minutesElement = document.querySelector(
      `#${roomName}-${device.name}-minutes`
    )
    const onButton = document.querySelector(
      `#${roomName}-${device.name}-${actions.on}`
    )
    const offButton = document.querySelector(
      `#${roomName}-${device.name}-${actions.off}`
    )
    const hasTimer = typeof device.startTimer === 'function'
    const getHours = () => parseInt(hoursElement?.value) || 0
    const getMinutes = () => parseInt(minutesElement?.value) || 0

    const setButtonState = (activeButton, inactiveButtons) => {
      if (activeButton) {
        activeButton.classList.add('is-active')
        activeButton.disabled = true
      }

      inactiveButtons.forEach((button) => {
        if (button) {
          button.classList.remove('is-active')
          button.disabled = false
        }
      })
    }

    const handleOnClick = () => {
      if (onButton.classList.contains('is-active')) return
      if (hasTimer) {
        const hours = getHours()
        const minutes = getMinutes()

        if (hours > 0 || minutes > 0) {
          device.startTimer(hours, minutes, roomName)
          hoursElement.value = 0
          minutesElement.value = 0
          device[actions.on]?.()
          setButtonState(onButton, [offButton, openHalfButton])
        } else {
          console.log(`Set timer for ${device.name}, please`)
        }
      } else {
        device[actions.on]?.()
        setButtonState(onButton, [offButton, openHalfButton])
      }
    }
    const handleOffClick = () => {
      if (offButton.classList.contains('is-active')) return
      if (hasTimer) {
        if (device.timer) {
          clearInterval(device.timer)
          device.timer = null
          timerElement.innerText = 'Timer 00 : 00 : 00'
        }
      }
      device[actions.off]?.()
      setButtonState(offButton, [onButton, openHalfButton])
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
