import { renderLight } from './ui/light-ui.js'
import { renderCurtains } from './ui/curtains-ui.js'
import { renderAirConditioner } from './ui/air-conditioner-ui.js'
import { renderTelevision } from './ui/television-ui.js'
import { renderHomeButton } from './ui/render-buttons-ui.js'

const main = document.querySelector('main')
const originalContent = main.innerHTML

const bindEvents = () => {
  const livingRoom = document.querySelector('#living-room')
  livingRoom.addEventListener('click', () => {
    main.innerHTML = `
        ${renderHomeButton()}
        <h2>Living Room devices</h2>
        <div class="devices-wrapper">
            ${renderLight()}
            ${renderCurtains()}
            ${renderAirConditioner()}
            ${renderTelevision()}
        </div>
        `
    const toHome = document.getElementById('home')
    toHome.addEventListener('click', () => {
      main.innerHTML = originalContent
      bindEvents()
    })
  })
}
bindEvents()
