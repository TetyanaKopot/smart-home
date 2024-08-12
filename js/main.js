import { rooms } from './rooms.js'
import { renderRoom } from './ui/render-room.js'
import { controlActions } from './config.js'

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
        console.log(actions)

        if (actions) {
        }
        const onButton = document.querySelector(
          `#${roomName}-${device.name}-${actions.on}`
        )
        if (onButton) {
          onButton.addEventListener('click', () => {
            if (typeof device[actions.on] === 'function') {
              device[actions.on]()
            }
            // updateDeviceUI(device);
          })
        }
        const offButton = document.querySelector(
          `#${roomName}-${device.name}-off`
        )
        if (offButton) {
          offButton.addEventListener('click', () => {
            if (typeof device[actions.off] === 'function') {
              device[actions.off]()
            }
            // updateDeviceUI(device);
          })
        } else {
          console.error(`Немає дій для пристрою ${device.constructor.name}`)
        }
        const brightnessSlider = document.querySelector(
          `#${roomName}-${device.name}-brightness`
        )
        // console.log(`#${roomName}-${device.name}-brightness`)
        if (brightnessSlider) {
          brightnessSlider.addEventListener('input', (event) => {
            device.setBrightness(event.target.value)
            // updateDeviceUI(device);
          })
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
