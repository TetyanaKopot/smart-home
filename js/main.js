import { rooms } from './rooms.js'
import { renderRoom } from './ui/render-room.js'
import { hendleInpurRange } from './events/input-range.js'
import { handleOnOffClick } from './events/on-off-buttons.js'
import { handleLightColorButtons } from './events/light-colors.js'

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
        handleOnOffClick(device, roomName)
        hendleInpurRange(device, roomName)
        handleLightColorButtons(device, roomName)
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
