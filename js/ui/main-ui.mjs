import { renderLight } from './light-ui.mjs'
import { renderCurtains } from './curtains-ui.mjs'
import { renderAirConditioner } from './air-conditioner-ui.mjs'
import { renderTelevision } from './television-ui.mjs'

const main = document.querySelector('main')
const originalContent = main.innerHTML
function bindEvents() {
  const livingRoom = document.querySelector('#living-room')
  livingRoom.addEventListener('click', () => {
    main.innerHTML = `
        <button class="button" id="home">
            <i class="fa-solid fa-house"></i>
        </button>
        <h2>Living-room devices</h2>
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
