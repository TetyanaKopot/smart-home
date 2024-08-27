export const handleLightColorButtons = (device, roomName) => {
  const colorsElement = document.querySelector(
    `#${roomName}-${device.name}-colors`
  )

  if (colorsElement) {
    colorsElement.addEventListener('click', (event) => {
      const color = event.target.dataset.color
      if (color) {
        device.changeColor(color)

        const allColorButtons = colorsElement.querySelectorAll('.light-color')
        allColorButtons.forEach((button) => {
          button.classList.remove('is-active')
        })
        event.target.classList.add('is-active')
      }
      device.saveState(roomName)
      // syncUIWithStorage(device, roomName)
    })
  }
}
