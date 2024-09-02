import { rooms } from './app-configs/rooms.js'
import { renderRoom } from './ui/render-room.js'
import { handleInputRange } from './events/input-range.js'
import { handleOnOffClick } from './events/handle-on-off-buttons.js'
import { handleLightColorButtons } from './events/light-colors.js'
import { handleTvControll } from './events/tv-controll.js'
import { syncUIWithStorage } from './ui/sync-ui-with-storage.js'
import { loadRoomsFromStorage } from './events/config-devices.js'
import { restoreDevice } from './events/config-devices.js'

const main = document.querySelector('main')
const originalContent = main.innerHTML

export const bindEvents = () => {
  const storedRooms = loadRoomsFromStorage()
  storedRooms.forEach((room) => {
    const roomName = room.name.toLowerCase()
    const roomElement = document.querySelector(`#${roomName}`)

    room.devices = room.devices.map(restoreDevice)

    roomElement.addEventListener('click', () => {
      main.innerHTML = renderRoom(room)

      room.devices.forEach((device) => {
        const roomName = room.name.toLowerCase()
        device.loadState(roomName)
        handleOnOffClick(device, roomName)
        handleInputRange(device, roomName)
        handleLightColorButtons(device, roomName)
        handleTvControll(device, roomName)
        syncUIWithStorage(device, roomName)
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
