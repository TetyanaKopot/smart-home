import { rooms } from './app-configs/rooms.js'
import { renderRoom } from './ui/render-room.js'
import { handleInputRange } from './events/input-range.js'
import { handleOnOffClick } from './events/handle-on-off-buttons.js'
import { handleLightColorButtons } from './events/light-colors.js'
import { handleTvControll } from './events/tv-controll.js'
import { syncUIWithStorage } from './ui/sync-ui-with-storage.js'
import { loadRoomsFromStorage } from './events/config-devices.js'
import { restoreDevice } from './events/config-devices.js'
import { updateSecurityUI } from './events/sequrity.js'

const main = document.querySelector('main')
const originalContent = main.innerHTML

let isProtect = JSON.parse(localStorage.getItem('Security')) || false

const handleNavigation = (roomName) => {
  const room = rooms.find((r) => r.name.toLowerCase() === roomName)
  if (room) {
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
      window.history.pushState({}, '', '/')
      main.innerHTML = originalContent
      updateSecurityUI()
      bindEvents()
    })
  } else {
    main.innerHTML =
      '<h2>404 - Room not found</h2><a href="/">Go back to Home</a>'
  }
}

export const bindEvents = () => {
  rooms.forEach((room) => {
    const roomElement = document.querySelector(`#${room.name.toLowerCase()}`)

    room.devices = room.devices.map(restoreDevice)

    roomElement.addEventListener('click', () => {
      const roomName = room.name.toLowerCase()
      window.history.pushState({}, '', `/${roomName}`)
      handleNavigation(roomName)
    })
  })
}

window.onpopstate = () => {
  const path = window.location.pathname.slice(1)

  if (path) {
    handleNavigation(path)
  } else {
    main.innerHTML = originalContent
    updateSecurityUI()
    bindEvents()
  }
}

bindEvents()

// export const bindEvents = () => {
//   const storedRooms = loadRoomsFromStorage()
//   storedRooms.forEach((room) => {
//     const roomName = room.name.toLowerCase()
//     const roomElement = document.querySelector(`#${roomName}`)

//     room.devices = room.devices.map(restoreDevice)

//     roomElement.addEventListener('click', () => {
//       main.innerHTML = renderRoom(room)

//       room.devices.forEach((device) => {
//         const roomName = room.name.toLowerCase()
//         device.loadState(roomName)
//         handleOnOffClick(device, roomName)
//         handleInputRange(device, roomName)
//         handleLightColorButtons(device, roomName)
//         handleTvControll(device, roomName)
//         syncUIWithStorage(device, roomName)
//       })

//       const toHome = document.querySelector('.home-button')
//       toHome.addEventListener('click', () => {
//         main.innerHTML = originalContent
//         updateSecurityUI()
//         bindEvents()
//       })
//     })
//   })
// }

// bindEvents()
