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

    // Оновлення додаткових параметрів пристрою

    if (param && deviceData[param.power] !== undefined) {
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
    // if (deviceData.tempValue) {
    //   const tempValueElement = document.querySelector(
    //     `#${roomName}-${device.name}-temperature`
    //   )
    //   const tempDisplayElement = document.querySelector(
    //     `#${roomName}-${device.name}-temperature-value`
    //   )
    //   if (tempValueElement && tempDisplayElement) {
    //     tempValueElement.value = deviceData.tempValue
    //     tempDisplayElement.textContent = `${deviceData.tempValue}°C`
    //   }
    // }

    // if (deviceData.brightValue) {
    //   const brightnessValueElement = document.querySelector(
    //     `#${roomName}-${device.name}-brightness`
    //   )
    //   const brightnessDisplayElement = document.querySelector(
    //     `#${roomName}-${device.name}-brightness-value`
    //   )
    //   if (brightnessValueElement && brightnessDisplayElement) {
    //     brightnessValueElement.value = deviceData.brightValue
    //     brightnessDisplayElement.textContent = `${deviceData.brightValue}lm`
    //   }
    // }

    // if (deviceData.powValue) {
    //   const powerValueElement = document.querySelector(
    //     `#${roomName}-${device.name}-power`
    //   )
    //   const powerDisplayElement = document.querySelector(
    //     `#${roomName}-${device.name}-power-value`
    //   )
    //   if (powerValueElement && powerDisplayElement) {
    //     powerValueElement.value = deviceData.powValue
    //     powerDisplayElement.textContent = `${deviceData.powValue}RPM`
    //   }
    // }
  }
}
