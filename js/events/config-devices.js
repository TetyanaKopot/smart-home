import { initModal } from './init-modal.js'
import { rooms } from '../app-configs/rooms.js'
import { bindEvents } from '../main.js'

import { AirConditioner } from '../devices/air-conditioner.js'
import { Boiler } from '../devices/boiler.js'
import { Curtains } from '../devices/curtains.js'
import { Door } from '../devices/door.js'
import { Hood } from '../devices/hood.js'
import { Light } from '../devices/light.js'
import { Oven } from '../devices/oven.js'
import { Television } from '../devices/television.js'
import { WashingMachine } from '../devices/washing-machine.js'

initModal('#backdrop-config', '#settings', '#close-modal-config')

const addDeviceToRoom = (roomName, newDevice) => {
  const storedRooms = JSON.parse(localStorage.getItem('rooms')) || rooms
  const room = storedRooms.find((room) => room.name === roomName)

  if (room) {
    room.devices.push(newDevice)
    localStorage.setItem('rooms', JSON.stringify(storedRooms))
  }
}

export const loadRoomsFromStorage = () => {
  const storedRooms = JSON.parse(localStorage.getItem('rooms')) || rooms
  return storedRooms
}

const addNewDevice = () => {
  const roomName = document.querySelector('#room-select').value
  const deviceType = document.querySelector('#device-type-select').value

  let newDevice

  switch (deviceType) {
    case 'AirConditioner':
      newDevice = new AirConditioner('AC', roomName)
      break
    case 'Boiler':
      newDevice = new Boiler('Boiler', roomName)
      break
    case 'Curtains':
      newDevice = new Curtains('Curtains', roomName)
      break
    case 'Door':
      newDevice = new Door('Door', roomName)
      break
    case 'Hood':
      newDevice = new Hood('Hood', roomName)
      break
    case 'Light':
      newDevice = new Light('Light', roomName)
      break
    case 'Oven':
      newDevice = new Oven('Oven', roomName)
      break
    case 'Television':
      newDevice = new Television('Television', roomName)
      break
    case 'WashingMachine':
      newDevice = new WashingMachine('WashingMachine', roomName)
      break
    default:
      throw new Error('Unknown device type')
  }

  if (newDevice) {
    addDeviceToRoom(roomName, newDevice)
    bindEvents()
  }
}

const restoreDevice = (deviceData) => {
  // Визначаємо клас на основі типу пристрою
  switch (deviceData.type) {
    case 'AirConditioner':
      return new AirConditioner(
        deviceData.name,
        deviceData.state,
        deviceData.isOn,
        deviceData.temperature
      )
    case 'Boiler':
      return new Boiler(
        deviceData.name,
        deviceData.state,
        deviceData.isOn,
        deviceData.temperature
      )
    case 'Curtains':
      return new Curtains(
        deviceData.name,
        deviceData.state,
        deviceData.isOpen,
        deviceData.halfOpen
      )
    case 'Door':
      return new Door(deviceData.name, deviceData.state, deviceData.isOpen)
    case 'Hood':
      return new Hood(
        deviceData.name,
        deviceData.state,
        deviceData.isOn,
        deviceData.temperature
      )
    case 'Light':
      return new Light(
        deviceData.name,
        deviceData.state,
        deviceData.isOn,
        deviceData.brightness,
        deviceData.color
      )
    case 'Oven':
      return new Oven(
        deviceData.name,
        deviceData.state,
        deviceData.isOn,
        deviceData.temperature,
        deviceData.timer,
        deviceData.startTimestamp
      )
    case 'Television':
      return new Television(
        deviceData.name,
        deviceData.state,
        deviceData.isOn,
        deviceData.currentChannel,
        deviceData.volume
      )
    case 'WashingMachine':
      return new WashingMachine(
        deviceData.name,
        deviceData.state,
        deviceData.isOn,
        deviceData.temperature,
        deviceData.timer,
        deviceData.startTimestamp,
        deviceData.mode
      )
    default:
      throw new Error(`Unknown device type: ${deviceData.type}`)
  }
}

const savedDevices = JSON.parse(localStorage.getItem('devices')) || []
const devices = savedDevices.map(restoreDevice)
document.querySelector('#add-device').addEventListener('click', addNewDevice)
