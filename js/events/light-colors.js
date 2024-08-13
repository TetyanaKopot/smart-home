export const handleLightColorButtons = (device, roomName) => {
  const colorsElement = document.querySelector(
    `#${roomName}-${device.name}-colors`
  )

  if (colorsElement) {
    colorsElement.addEventListener('click', (event) => {
      const color = event.target.dataset.color
      if (color) {
        device.changeColor(color)
      }
    })
  }
}
