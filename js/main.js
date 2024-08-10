import { renderLight } from './ui/render-light.js'
import { renderCurtains } from './ui/render-curtains.js'
import { renderAirConditioner } from './ui/render-air-conditioner.js'
import { renderTelevision } from './ui/render-television.js'
import { renderRoom } from './ui/render-room.js'

const rooms = [
  {
    name: 'Livingroom',
    devices: [
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
    devices: [renderLight],
  },
]

const main = document.querySelector('main')
const originalContent = main.innerHTML

const bindEvents = () => {
  rooms.forEach((room) => {
    const roomElement = document.querySelector(`#${room.name.toLowerCase()}`)
    roomElement.addEventListener('click', () => {
      main.innerHTML = renderRoom(room)

      const toHome = document.querySelector('#home')
      toHome.addEventListener('click', () => {
        main.innerHTML = originalContent
        bindEvents()
      })
    })
  })
}
bindEvents()
