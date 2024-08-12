import { rooms } from './rooms.js'
import { renderRoom } from './ui/render-room.js'
import { controlActions, parameterControls } from './config.js'

const main = document.querySelector('main')
const originalContent = main.innerHTML

const bindEvents = () => {
  rooms.forEach((room) => {
    const roomName = room.name.toLowerCase()
    const roomElement = document.querySelector(`#${roomName}`)
    roomElement.addEventListener('click', () => {
      main.innerHTML = renderRoom(room)

      room.devices.forEach((device) => {
        const roomName = room.name.toLowerCase()
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
      })

      const toHome = document.querySelector('.home-button')
      toHome.addEventListener('click', () => {
        main.innerHTML = originalContent
        bindEvents()
      })
    })
  })
}
bindEvents()
