export const updateStatusElement = (message, roomName, device) => {
  // console.log(device)
  const statusElement = document.querySelector(
    `#${roomName}-${device.name}-status`
  )

  if (statusElement) {
    statusElement.textContent = message
  }
}

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
