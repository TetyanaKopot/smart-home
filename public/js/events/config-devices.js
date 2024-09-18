import { initModal, handleSuccess, handleError } from './handle-modal.js'
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

const addDevice = document.querySelector('#add-device')
const removeDevice = document.querySelector('#remove-device')

const closeConfigModal = initModal(
  '#backdrop-config',
  '#settings',
  '#close-modal-config'
)

const addDeviceToRoom = (roomName, newDevice) => {
  console.log('Before saving to storage, device:', newDevice)
  const storedRooms = JSON.parse(localStorage.getItem('rooms')) || rooms
  const room = storedRooms.find((room) => room.name === roomName)

  if (room) {
    const existingDevice = room.devices.find(
      (device) => device.name === newDevice.name
    )

    if (existingDevice) {
      console.log(`Device ${newDevice.name} already exists in ${roomName}`)
      handleError(
        addDevice,
        `Device ${newDevice.name} already exists in ${roomName}`
      )
      return
    }

    const deviceWithType = {
      ...newDevice,
      type: newDevice.constructor.name,
    }
    room.devices.push(deviceWithType)
    localStorage.setItem('rooms', JSON.stringify(storedRooms))
    handleSuccess(addDevice, 'Add Device', closeConfigModal)
  }
}

export const loadRoomsFromStorage = () => {
  const storedRooms = JSON.parse(localStorage.getItem('rooms')) || rooms
  return storedRooms
}

const addNewDevice = () => {
  const roomName = document.querySelector('#room-select').value
  const deviceType = document.querySelector('#device-type-select').value
  console.log(roomName)
  console.log(deviceType)

  let newDevice

  switch (deviceType) {
    case 'AirConditioner':
      newDevice = new AirConditioner('AirConditioner', roomName)
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

export const restoreDevice = (deviceData) => {
  if (!deviceData.type) {
    if (deviceData.name === 'AC') {
      deviceData.type = 'AirConditioner'
    } else {
      deviceData.type = deviceData.name
    }
  }
  switch (deviceData.type) {
    case 'AirConditioner':
      return new AirConditioner(
        deviceData.name,
        deviceData.roomName,
        deviceData.isOn,
        deviceData.tempValue
      )
    case 'Boiler':
      return new Boiler(
        deviceData.name,
        deviceData.roomName,
        deviceData.isOn,
        deviceData.tempValue
      )
    case 'Light':
      return new Light(
        deviceData.name,
        deviceData.roomName,
        deviceData.isOn,
        deviceData.brightnessValue,
        deviceData.color
      )
    case 'Curtains':
      return new Curtains(
        deviceData.name,
        deviceData.roomName,
        deviceData.isOpen,
        deviceData.halfOpen
      )
    case 'Door':
      return new Door(deviceData.name, deviceData.roomName, deviceData.isOpen)
    case 'Television':
      return new Television(
        deviceData.name,
        deviceData.roomName,
        deviceData.isOn,
        deviceData.currentChannel,
        deviceData.volume
      )
    case 'WashingMachine':
      return new WashingMachine(
        deviceData.name,
        deviceData.roomName,
        deviceData.isOn,
        deviceData.tempValue,
        deviceData.timer,
        deviceData.startTimestamp,
        deviceData.mode
      )
    case 'Oven':
      return new Oven(
        deviceData.name,
        deviceData.roomName,
        deviceData.isOn,
        deviceData.tempValue,
        deviceData.timer,
        deviceData.startTimestamp
      )
    case 'Hood':
      return new Hood(deviceData.name, deviceData.roomName, deviceData.isOn)
    default:
      throw new Error('Unknown device type: ' + deviceData.type)
  }
}
const savedDevices = JSON.parse(localStorage.getItem('devices')) || []
const devices = savedDevices.map(restoreDevice)

const removeDeviceFromRoom = (roomName, deviceName) => {
  const storedRooms = JSON.parse(localStorage.getItem('rooms')) || rooms
  const room = storedRooms.find((room) => room.name === roomName)
  if (room) {
    const deviceIndex = room.devices.findIndex(
      (device) => device.name === deviceName
    )
    if (deviceIndex !== -1) {
      room.devices.splice(deviceIndex, 1)
      localStorage.setItem('rooms', JSON.stringify(storedRooms))
      console.log(`Device ${deviceName} removed from ${roomName}`)
      handleSuccess(removeDevice, 'Remove Device', closeConfigModal)
      bindEvents()
    } else {
      handleError(removeDevice, `Device ${deviceName} not found in ${roomName}`)
    }
  }
}

const removeDev = () => {
  const roomName = document.querySelector('#room-select').value
  const deviceName = document.querySelector('#device-type-select').value
  removeDeviceFromRoom(roomName, deviceName)
}

removeDevice.addEventListener('click', removeDev)
addDevice.addEventListener('click', addNewDevice)
