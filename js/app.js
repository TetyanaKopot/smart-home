const main = document.querySelector('main')
const security = document.querySelector('#lsecurity')
const menuBtn = document.querySelector('.menu')
const settingsBtn = document.querySelector('.sttings')
const yard = document.querySelector('#yard')
const garage = document.querySelector('#garage')
const bedroom = document.querySelector('#bedroom')
const kitchen = document.querySelector('#kitchen')
const bathroom = document.querySelector('#bathroom')

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
            <div class="device">
                <h3 class="device__title">Lights</h3>
                <i class="fa-solid fa-lightbulb"></i>
            </div>
            <div class="device">
                <h3 class="device__title">Curtains</h3>
                <i class="fa-regular fa-window-maximize"></i>
            </div>
            <div class="device">
                <h3 class="device__title">AC</h3>
                <i class="fa-solid fa-fan"></i>
            </div>
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
