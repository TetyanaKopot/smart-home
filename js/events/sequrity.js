import { initModal, handleSuccess, handleError } from './handle-modal.js'

const security = document.querySelector('#security')
const changeStatusBtn = document.querySelector('#change-status')
const newUser = document.querySelector('#new-user')
const deleteUser = document.querySelector('#delete-user')
const userName = document.querySelector('#name')
const userPassword = document.querySelector('#password')
const nameError = document.querySelector('#name-error')
const passwordError = document.querySelector('#password-error')
const securityIcon = document.querySelector('#security-icon')

const closeSecurityModal = initModal(
  '#backdrop-sequrity',
  '#security',
  '#close-modal-sequrity'
)

let isProtect = JSON.parse(localStorage.getItem('Security')) || false

export const updateSecurityUI = () => {
  if (isProtect) {
    securityIcon.classList.remove('fa-lock-open')
    securityIcon.classList.add('fa-lock')
  } else {
    securityIcon.classList.remove('fa-lock')
    securityIcon.classList.add('fa-lock-open')
  }
  changeStatusBtn.innerText = isProtect ? 'Deactivate' : 'Activate'
}

const saveProtect = () => {
  localStorage.setItem('Security', JSON.stringify(isProtect))
  console.log(`Security status saved: ${isProtect}`)
}

updateSecurityUI()

const regName = /^\w{3,}$/i
const regPass = /^(\w|\d){8,}$/

const displayError = (element, condition) => {
  if (condition) {
    element.classList.add('error')
  } else {
    element.classList.remove('error')
  }
}

const addNewUser = () => {
  const name = userName.value.trim()
  const password = userPassword.value.trim()

  const hasNameError = !regName.test(name)
  const hasPasswordError = !regPass.test(password)

  displayError(nameError, hasNameError)
  displayError(passwordError, hasPasswordError)

  if (!hasNameError && !hasPasswordError) {
    const users = JSON.parse(localStorage.getItem('users')) || []

    const existingUser = users.find((user) => user.name === name)

    if (existingUser) {
      handleError(newUser, `${name} already exists`)
      return
    }

    users.push({ name, password })
    localStorage.setItem('users', JSON.stringify(users))
    userName.value = ''
    userPassword.value = ''
    handleSuccess(newUser, 'New User', closeSecurityModal)
  }
}

const deleteOldUser = () => {
  const name = userName.value.trim()
  let users = JSON.parse(localStorage.getItem('users')) || []

  const userIndex = users.findIndex((user) => user.name === name)
  if (userIndex !== -1) {
    users.splice(userIndex, 1)
    localStorage.setItem('users', JSON.stringify(users))
    userName.value = ''
    userPassword.value = ''
    handleSuccess(deleteUser, 'Delete User', closeSecurityModal)
  } else {
    handleError(deleteUser, 'User not found')
  }
}

const checkUserCredentials = () => {
  const name = userName.value.trim()
  const password = userPassword.value.trim()

  const users = JSON.parse(localStorage.getItem('users')) || []
  const userExists = users.some(
    (user) => user.name === name && user.password === password
  )

  if (userExists) {
    isProtect = !isProtect
    updateSecurityUI()
    saveProtect()
    userName.value = ''
    userPassword.value = ''
    handleSuccess(
      changeStatusBtn,
      isProtect ? 'Deactivate' : 'Activate',
      closeSecurityModal
    )
  } else {
    handleError(changeStatusBtn, 'Incorrect name or password!')
  }
}

changeStatusBtn.addEventListener('click', checkUserCredentials)
newUser.addEventListener('click', addNewUser)
deleteUser.addEventListener('click', deleteOldUser)
