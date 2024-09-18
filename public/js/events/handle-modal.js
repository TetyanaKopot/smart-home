export const initModal = (modalSelector, openBtnSelector, closeBtnSelector) => {
  const modal = document.querySelector(modalSelector)

  const open = () => modal.classList.remove('is-hidden')
  const close = () => modal.classList.add('is-hidden')

  document.addEventListener('click', (event) => {
    if (event.target.matches(openBtnSelector)) {
      open()
    } else if (event.target.matches(closeBtnSelector)) {
      close()
    }
  })
  return close
}

export const handleSuccess = (btn, innerBtn, closeModal) => {
  btn.classList.add('successful')
  btn.innerText = 'Successfully!'
  setTimeout(() => {
    btn.classList.remove('successful')
    btn.innerText = innerBtn
    closeModal()
  }, 1000)
}

export const handleError = (btn, errorMessage) => {
  const previousText = btn.innerText
  btn.classList.add('error')
  btn.innerText = errorMessage
  setTimeout(() => {
    btn.classList.remove('error')
    btn.innerText = previousText
  }, 1000)
}
