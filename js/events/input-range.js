import { parameterControls } from '../config.js'

export const setupDeviceControls = (device, roomName) => {
  const param = parameterControls[device.constructor.name]
  if (param) {
    const powerSlider = document.querySelector(
      `#${roomName}-${device.name}-${param.power}`
    )
    const poverValueSpan = document.querySelector(
      `#${roomName}-${device.name}-${param.power}-value`
    )
    if (powerSlider && poverValueSpan) {
      powerSlider.addEventListener('input', (event) => {
        const newValue = event.target.value
        poverValueSpan.textContent = newValue

        if (typeof device[param.power] === 'function') {
          device[param.power](newValue)
        }
        // updateDeviceUI(device);
      })
    }
  }
}
