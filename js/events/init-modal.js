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

// initModal('#backdrop-sequrity', '#security', '#close-modal-sequrity')
// initModal('#backdrop-config', '#settings', '#close-modal-config')
