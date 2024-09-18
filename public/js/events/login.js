import { initModal, handleSuccess, handleError } from './handle-modal.js'

const login = document.querySelector('#login')
const userName = document.querySelector('#log-name')
const userPassword = document.querySelector('#log-password')
const loginBtn = document.querySelector('#login-btn')
const greeting = document.querySelector('#greeting')

const isUserLogedIn = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  return !!currentUser
}

const updateUIForLoggedInUser = (name) => {
  login.innerText = 'Log Out'
  greeting.innerText = `Hello, ${name}!`
}
const updateUIForLoggedOutUser = () => {
  login.innerText = 'Log In'
  greeting.innerText = ''
}

const closeLoginModal = initModal(
  '#backdrop-login',
  '#login',
  '#close-modal-login'
)

window.addEventListener('load', () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  if (isUserLogedIn()) {
    updateUIForLoggedInUser(currentUser.name)
  }
})

login.addEventListener('click', (event) => {
  if (isUserLogedIn()) {
    localStorage.removeItem('currentUser')
    updateUIForLoggedOutUser()
  } else {
    document.querySelector('#backdrop-login').classList.remove('is-hidden')
  }
  event.stopImmediatePropagation()
})

const checkUser = () => {
  const name = userName.value.trim()
  const password = userPassword.value.trim()

  const users = JSON.parse(localStorage.getItem('users')) || []
  const user = users.find(
    (user) => user.name === name && user.password === password
  )

  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user))
    updateUIForLoggedInUser(user.name)
    userName.value = ''
    userPassword.value = ''
    handleSuccess(loginBtn, 'Log In', closeLoginModal)
  } else {
    handleError(loginBtn, 'Incorrect name or password!')
  }
}

loginBtn.addEventListener('click', checkUser)
