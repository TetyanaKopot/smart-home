const modal = document.querySelector('#backdrop-sequrity')
const openBtn = document.querySelector('#security')
const closeBtn = document.querySelector('#close-modal-sequrity')
const changeStatusBtn = document.querySelector('#change-status')
const addUser = document.querySelector('#add-user')
const newData = document.querySelector('#new-data')
const userName = document.querySelector('#name')
const userPassword = document.querySelector('#password')
const nameError = document.querySelector('#name-error')
const passwordError = document.querySelector('#password-error')

const open = () => modal.classList.remove('is-hidden')
const close = () => modal.classList.add('is-hidden')

openBtn.addEventListener('click', open)
closeBtn.addEventListener('click', close)

const isProtect = false
changeStatusBtn.innerText = 'Activate'

const regName = /^\w{3,}$/i
const regPass = /^(\w|\d){8,}$/

addUser.addEventListener('click', () => {
  changeStatusBtn.style.display = 'none'
  addUser.style.display = 'none'
  newData.style.display = 'block'
  userName.placeholder = 'Enter new name'
  userPassword.placeholder = 'Enter new password'
})

const addNewData = () => {
  const name = userName.value.trim()
  const password = userPassword.value.trim()

  if (!regName.test(name) || !regPass.test(password)) {
    nameError.innerText = 'Name must be at least 3 letters long'
    passwordError.innerText = '8 characters (letters and numbers)'
  } else if (regName.test(name) && regPass.test(password)) {
    const users = JSON.parse(localStorage.getItem('users')) || []
    users.push({ name, password })
    localStorage.setItem('users', JSON.stringify(users))

    passwordError.innerText = 'User added successfully!'
    setTimeout(() => (passwordError.innerText = ''), 3000)

    userName.value = ''
    userPassword.value = ''
    changeStatusBtn.style.display = 'block'
    addUser.style.display = 'block'
    newData.style.display = 'none'
    userName.placeholder = 'Name'
    userPassword.placeholder = 'Password'
    nameError.innerText = ''
  }
}

newData.addEventListener('click', addNewData)

const checkUserCredentials = () => {
  const name = userName.value.trim()
  const password = userPassword.value.trim()

  const users = JSON.parse(localStorage.getItem('users')) || []

  const userExists = users.some(
    (user) => user.name === name && user.password === password
  )

  if (userExists) {
    passwordError.style.color = '#365e32'
    passwordError.innerText = 'Security system activated!'
  } else {
    passwordError.innerText = 'Incorrect name or password!'
  }
}
