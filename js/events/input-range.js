import { parameterControls } from '../config.js'

export const handleInputRange = (device, roomName) => {
  const param = parameterControls[device.constructor.name]
  if (param) {
    const powerSlider = document.querySelector(
      `#${roomName}-${device.name}-${param.power}`
    )
    const powerValueSpan = document.querySelector(
      `#${roomName}-${device.name}-${param.power}-value`
    )
    const unit = param.unit || ''
    if (powerSlider && powerValueSpan) {
      powerSlider.addEventListener('input', (event) => {
        const newValue = event.target.value
        powerValueSpan.textContent = `${newValue}${unit}`

        if (typeof device[param.power] === 'function') {
          device[param.power](newValue)
        }
        device.saveState(roomName)
      })
    }
  }
}
