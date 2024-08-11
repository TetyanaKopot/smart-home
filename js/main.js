import { rooms } from './rooms.js'
import { renderRoom } from './ui/render-room.js'

const main = document.querySelector('main')
const originalContent = main.innerHTML

const bindEvents = () => {
  rooms.forEach((room) => {
    const roomName = room.name.toLowerCase()
    const roomElement = document.querySelector(`#${roomName}`)
    roomElement.addEventListener('click', () => {
      main.innerHTML = renderRoom(room)

      room.devices.forEach((device) => {
        document
          .querySelector(`#${roomName}-${device.name}-on`)
          .addEventListener('click', () => {
            device.turnOn()
            // updateDeviceUI(device);
          })

        document
          .querySelector(`#${roomName}-${device.name}-off`)
          .addEventListener('click', () => {
            device.turnOff()
            // updateDeviceUI(device);
          })

        document
          .querySelector(`#${roomName}-${device.name}-brightness`)
          .addEventListener('input', (event) => {
            device.setBrightness(event.target.value)
            // updateDeviceUI(device);
          })
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
