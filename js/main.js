import { renderLight } from './ui/render-light.js'
import { renderCurtains } from './ui/render-curtains.js'
import { renderAirConditioner } from './ui/render-air-conditioner.js'
import { renderTelevision } from './ui/render-television.js'
import { renderRoom } from './ui/render-room.js'
import { renderOven } from './ui/render-oven.js'
import { renderHood } from './ui/render-hood.js'
import { renderBoiler } from './ui/render-boiler.js'
import { renderWashingMachine } from './ui/render-washing-machine.js'
import { renderDoor } from './ui/render-door.js'

const rooms = [
  {
    name: 'LivingRoom',
    devices: [
      renderDoor,
      renderLight,
      renderCurtains,
      renderAirConditioner,
      renderTelevision,
    ],
  },
  {
    name: 'Bedroom',
    devices: [renderLight, renderCurtains, renderAirConditioner],
  },
  {
    name: 'Kitchen',
    devices: [renderLight, renderCurtains, renderOven, renderHood],
  },
  {
    name: 'UtilityRoom',
    devices: [renderLight, renderWashingMachine, renderBoiler],
  },
]

const main = document.querySelector('main')
const originalContent = main.innerHTML

const bindEvents = () => {
  rooms.forEach((room) => {
    const roomName = room.name.toLowerCase()
    const roomElement = document.querySelector(`#${roomName}`)
    roomElement.addEventListener('click', () => {
      main.innerHTML = renderRoom(room)
      console.log(roomElement)

      const toHome = document.querySelector('#home')
      toHome.addEventListener('click', () => {
        main.innerHTML = originalContent
        bindEvents()
      })
    })
  })
}
bindEvents()
