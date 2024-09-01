import { controlActions } from '../app-configs/config.js'
import { rooms } from '../app-configs/rooms.js'

export const populateRoomSelect = () => {
  const roomSelect = document.querySelector('#room-select')
  roomSelect.innerHTML = ''
  rooms.forEach((room) => {
    const option = document.createElement('option')
    option.value = room.name
    option.textContent = room.name
    roomSelect.appendChild(option)
  })
}

export const populateDeviceTypeSelect = () => {
  const deviceTypeSelect = document.querySelector('#device-type-select')
  deviceTypeSelect.innerHTML = ''
  for (const deviceType in controlActions) {
    const option = document.createElement('option')
    option.value = deviceType
    option.textContent = deviceType
    deviceTypeSelect.appendChild(option)
  }
}
populateRoomSelect()
populateDeviceTypeSelect()
