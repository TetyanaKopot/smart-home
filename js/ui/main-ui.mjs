import { renderLight } from './light-ui.mjs'
import { renderCurtains } from './curtains-ui.mjs'
import { renderAirConditioner } from './air-conditioner-ui.mjs'

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
            <div class="device">
                <h3 class="device__title">TV</h3>
                <i class="fa-solid fa-tv"></i>
            </div>
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
