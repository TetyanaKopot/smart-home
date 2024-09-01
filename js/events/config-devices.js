import { rooms } from '../app-configs/rooms.js'
import {
  populateRoomSelect,
  populateDeviceTypeSelect,
} from '../ui/modal-dropdowns.js'

import { initModal } from './init-modal.js'

import { AirConditioner } from '../devices/air-conditioner.js'
import { Boiler } from '../devices/boiler.js'
import { Curtains } from '../devices/curtains.js'
import { Door } from '../devices/door.js'
import { Hood } from '../devices/hood.js'
import { Light } from '../devices/light.js'
import { Oven } from '../devices/oven.js'
import { Television } from '../devices/television.js'
import { WashingMachine } from '../devices/washing-machine.js'

// const modal = document.querySelector('#backdrop-config')
// const openBtn = document.querySelector('#settings')
// const closeBtn = document.querySelector('#close-modal-config')

// const open = () => modal.classList.remove('is-hidden')
// const close = () => modal.classList.add('is-hidden')

// openBtn.addEventListener('click', open)
// closeBtn.addEventListener('click', close)

// const closeConfigModal = initModal('#backdrop-config', '#settings', '#close-modal-config');
initModal('#backdrop-config', '#settings', '#close-modal-config')

const addDeviceToRoom = () => {
  const roomName = document.querySelector('#room-select').value
  const deviceType = document.querySelector('#device-type-select').value

  const room = rooms.find((r) => r.name === roomName)
  const deviceName = `${deviceType}`

  let newDevice
  switch (deviceType) {
    case 'AirConditioner':
      newDevice = new AirConditioner(deviceName, roomName)
      break
    case 'Boiler':
      newDevice = new Boiler(deviceName, roomName)
      break
    case 'Curtains':
      newDevice = new Curtains(deviceName, roomName)
      break
    case 'Door':
      newDevice = new Door(deviceName, roomName)
      break
    case 'Hood':
      newDevice = new Hood(deviceName, roomName)
      break
    case 'Light':
      newDevice = new Light(deviceName, roomName)
      break
    case 'Oven':
      newDevice = new Oven(deviceName, roomName)
      break
    case 'Television':
      newDevice = new Television(deviceName, roomName)
      break
    case 'WashingMachine':
      newDevice = new WashingMachine(deviceName, roomName)
      break
    default:
      console.error('Unknown device type')
  }

  room.devices.push(newDevice)
  saveDevices(rooms)
  console.log(`${deviceName} added to ${roomName}`)
  // Можливо, оновити UI тут
  updateUI(roomName, newDevice)
}

const updateUI = (roomName, newDevice) => {
  const roomElement = document.querySelector(
    `#${roomName.toLowerCase()} .devices-wrapper`
  )
  if (roomElement) {
    roomElement.innerHTML += newDevice.render(roomName)
  }
}
const saveDevices = (devices) => {
  localStorage.setItem('devices', JSON.stringify(devices))
}

const loadDevices = () => {
  const devices = localStorage.getItem('devices')
  return devices ? JSON.parse(devices) : []
}

const renderSavedDevices = () => {
  const savedRooms = loadDevices()
  savedRooms.forEach((room) => {
    room.devices.forEach((deviceData) => {
      const deviceClass = getClassByName(deviceData.type)
      const deviceInstance = new deviceClass(deviceData.name, room.name)
      Object.assign(deviceInstance, deviceData)
      updateUI(room.name, deviceInstance)
    })
  })
}

// Обробник для кнопки додавання пристрою
document.querySelector('#add-device').addEventListener('click', addDeviceToRoom)

renderSavedDevices()
