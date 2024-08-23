export const setButtonState = (activeButton, inactiveButtons) => {
  inactiveButtons.forEach((button) => {
    if (button) {
      button.classList.remove('is-active')
      button.disabled = false
    }
  })

  if (activeButton) {
    activeButton.classList.add('is-active')
    activeButton.disabled = true
  }
}
