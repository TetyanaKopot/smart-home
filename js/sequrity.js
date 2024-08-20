const modal = document.querySelector('#backdrop-sequrity')
const openBtn = document.querySelector('#security')
const closeBtn = document.querySelector('#close-modal-sequrity')
const changeStatusBtn = document.querySelector('#change-status')
const addUser = document.querySelector('#add-user')
const newData = document.querySelector('#new-data')

const open = () => modal.classList.remove('is-hidden')
const close = () => modal.classList.add('is-hidden')

openBtn.addEventListener('click', open)
closeBtn.addEventListener('click', close)

const isProtect = false
changeStatusBtn.innerText = 'Protect'

const regName = /\w{3}/i
const regPass = /(\w\d){8}/

const userData = []

const userNname = document.querySelector('#name')
const userPassword = document.querySelector('#password')

addUser.addEventListener('click', () => {
  changeStatusBtn.style.display = 'none'
  addUser.style.display = 'none'
  newData.style.display = 'block'
  userNname.placeholder = 'Enter new name'
  userPassword.placeholder = 'Enter new password'
})

const addNewData = () => {
  userData.push({ name: userNname.value, password: userPassword.value })
  return userData
}
newData.addEventListener('click', addNewData)

console.log(userData)
console.log(addNewData())
