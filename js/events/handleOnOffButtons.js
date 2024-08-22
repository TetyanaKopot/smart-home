import { controlActions } from '../config.js'

export const handleOnOffClick = (device, roomName) => {
  const actions = controlActions[device.constructor.name]
  if (actions) {
    const onButton = document.querySelector(
      `#${roomName}-${device.name}-${actions.on}`
    )
    const offButton = document.querySelector(
      `#${roomName}-${device.name}-${actions.off}`
    )

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
      if (typeof device.startTimer === 'function') {
        device.on(roomName)
      } else {
        device[actions.on]?.(roomName)
      }
      setButtonState(onButton, [offButton, openHalfButton])
    }

    const handleOffClick = () => {
      if (offButton.classList.contains('is-active')) return
      device.off(roomName)
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

// const timerElement = document.querySelector(
//   `#${roomName}-${device.name}-timer`
// )
// const hoursElement = document.querySelector(
//   `#${roomName}-${device.name}-hours`
// )
// const minutesElement = document.querySelector(
//   `#${roomName}-${device.name}-minutes`
// )
// const modeSelectElement = document.querySelector(
//   `#${roomName}-${device.name}-mode-select`
// )
// const hasSelectElement = typeof device.setMode === 'function'
// const modeSelectLabel = document.querySelector(
//   `#${roomName}-${device.name}-mode-label`
// )

// const hasTimer = typeof device.startTimer === 'function'
// const getHours = () => parseInt(hoursElement?.value) || 0
// const getMinutes = () => parseInt(minutesElement?.value) || 0

// const handleOnClick = () => {
//   if (onButton.classList.contains('is-active')) return
//   if (hasTimer) {
//     const hours = getHours()
//     const minutes = getMinutes()

//     if (hours > 0 || minutes > 0) {
//       device.startTimer(hours, minutes, roomName)
//       hoursElement.value = 0
//       minutesElement.value = 0
//       if (hasSelectElement) {
//         modeSelectElement.disabled = true
//         const selectedModeIndex = modeSelectElement.selectedIndex
//         device.setMode(selectedModeIndex)
//       }
//       device[actions.on]?.(roomName)
//       setButtonState(onButton, [offButton, openHalfButton])
//       timerElement.classList.remove('error')
//       timerElement.innerText = ''
//     } else {
//       timerElement.classList.add('error')
//       timerElement.innerText = `Set timer for ${device.name}, please`
//       return
//     }
//   } else {
//     device[actions.on]?.()
//     setButtonState(onButton, [offButton, openHalfButton])
//   }
// }
// const handleOffClick = () => {
//   if (offButton.classList.contains('is-active')) return
//   if (hasTimer) {
//     if (device.timer) {
//       clearInterval(device.timer)
//       device.timer = null
//       timerElement.innerText = 'Timer 00 : 00 : 00'
//     }
//   }
//   device[actions.off]?.(roomName)
//   setButtonState(offButton, [onButton, openHalfButton])
//   if (hasSelectElement) {
//     modeSelectElement.disabled = false
//   }
// }
