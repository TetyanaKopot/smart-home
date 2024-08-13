import { controlActions } from '../config.js'

export const handleOnOffClick = (device, roomName) => {
  const actions = controlActions[device.constructor.name]

  if (actions) {
    const onButton = document.querySelector(
      `#${roomName}-${device.name}-${actions.on}`
    )
    if (onButton) {
      onButton.addEventListener('click', () => {
        if (typeof device[actions.on] === 'function') {
          device[actions.on]()
        }
        // updateDeviceUI(device)
      })
    }
    const offButton = document.querySelector(
      `#${roomName}-${device.name}-${actions.off}`
    )
    if (offButton) {
      offButton.addEventListener('click', () => {
        if (typeof device[actions.off] === 'function') {
          device[actions.off]()
        }
        // updateDeviceUI(device);
      })
    }
  }

  const openHalfButton = document.querySelector(
    `#${roomName}-${device.name}-open-half`
  )
  if (openHalfButton) {
    openHalfButton.addEventListener('click', () => {
      device.openHalf()
    })
  }
}
