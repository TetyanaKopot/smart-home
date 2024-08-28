import { controlActions } from '../config.js'
import { setButtonState, updateStatusElement } from './status-elements.js'
import { parameterControls } from '../config.js'

export const syncUIWithStorage = (device, roomName) => {
  const actions = controlActions[device.constructor.name]
  const param = parameterControls[device.constructor.name]
  const deviceData = JSON.parse(
    localStorage.getItem(`${roomName}-${device.name}`)
  )

  if (deviceData) {
    updateStatusElement(
      deviceData.isOn ? `${actions.on}` : `${actions.off}`,
      roomName,
      device
    )

    const onButton = document.querySelector(
      `#${roomName}-${device.name}-${actions.on}`
    )
    const offButton = document.querySelector(
      `#${roomName}-${device.name}-${actions.off}`
    )
    const openHalfButton = document.querySelector(
      `#${roomName}-${device.name}-open-half`
    )

    if (deviceData.halfOpen && openHalfButton) {
      setButtonState(openHalfButton, [onButton, offButton])
    } else if (deviceData.isOn || deviceData.isOpen) {
      setButtonState(
        onButton,
        openHalfButton ? [offButton, openHalfButton] : [offButton]
      )
    } else {
      setButtonState(
        offButton,
        openHalfButton ? [onButton, openHalfButton] : [onButton]
      )
    }

    if (deviceData.color) {
      const colorsElement = document.querySelectorAll(
        `#${roomName}-${device.name}-colors .light-color`
      )
      colorsElement.forEach((button) => {
        if (button.dataset.color === deviceData.color) {
          button.classList.add('is-active')
        } else {
          button.classList.remove('is-active')
        }
      })
    }

    if (param && deviceData[param.power] !== undefined) {
      console.log('deviceData[param.power]:', deviceData[param.power])

      const valueElement = document.querySelector(
        `#${roomName}-${device.name}-${param.power}`
      )
      const displayElement = document.querySelector(
        `#${roomName}-${device.name}-${param.power}-value`
      )

      if (valueElement && displayElement) {
        valueElement.value = deviceData[param.power]
        displayElement.textContent = `${deviceData[param.power]}${
          param.unit || ''
        }`
      }
    }

    if (deviceData.currentChannel) {
      const channelInput = document.querySelector(
        `#${roomName}-${device.name}-channel-input`
      )
      if (channelInput) {
        channelInput.value = deviceData.currentChannel
      }
    }

    if (deviceData.volume !== undefined) {
      const volumeInput = document.querySelector(
        `#${roomName}-${device.name}-volume-input`
      )
      if (volumeInput) {
        volumeInput.value = deviceData.volume
      }
    }
  }
}
