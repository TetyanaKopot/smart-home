import { initModal } from './init-modal.js'

const security = document.querySelector('#security')
const changeStatusBtn = document.querySelector('#change-status')
const newUser = document.querySelector('#new-user')
const userName = document.querySelector('#name')
const userPassword = document.querySelector('#password')
const nameError = document.querySelector('#name-error')
const passwordError = document.querySelector('#password-error')

const closeSecurityModal = initModal(
  '#backdrop-sequrity',
  '#security',
  '#close-modal-sequrity'
)

// Використовуємо однаковий ключ 'Security' для зберігання і завантаження стану
let isProtect = JSON.parse(localStorage.getItem('Security')) || false

const updateSecurityUI = () => {
  const lock = isProtect
    ? `<i class="fa-solid fa-lock"></i>`
    : `<i class="fa-solid fa-lock-open"></i>`
  security.innerHTML = `Security ${lock}`
  changeStatusBtn.innerText = isProtect ? 'Deactivate' : 'Activate'
}

const saveProtect = () => {
  localStorage.setItem('Security', JSON.stringify(isProtect)) // Змінено ключ на 'Security'
  console.log(`Security status saved: ${isProtect}`)
}

// Оновлюємо інтерфейс одразу після ініціалізації
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

const hendleSuccess = (btn, innerBtn) => {
  userName.value = ''
  userPassword.value = ''
  btn.innerText = 'Successfully!'
  setTimeout(() => {
    btn.innerText = innerBtn
    closeSecurityModal()
  }, 3000)
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
    users.push({ name, password })
    localStorage.setItem('users', JSON.stringify(users))

    hendleSuccess(newUser, 'New User')
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
    hendleSuccess(changeStatusBtn, isProtect ? 'Deactivate' : 'Activate')
  } else {
    const previousText = changeStatusBtn.innerText
    changeStatusBtn.classList.add('error')
    changeStatusBtn.innerText = 'Incorrect name or password!'
    setTimeout(() => {
      changeStatusBtn.classList.remove('error')
      changeStatusBtn.innerText = previousText
    }, 3000)
  }
}

changeStatusBtn.addEventListener('click', checkUserCredentials)
newUser.addEventListener('click', addNewUser)
