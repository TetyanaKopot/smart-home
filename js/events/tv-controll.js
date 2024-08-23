import { setButtonState } from './set-button-state.js'

export const handleTvControll = (device, roomName) => {
  if (typeof device.adjustVolume === 'function') {
    const channelOptions = document.querySelector(
      `#${roomName}-${device.name}-channel-select`
    )
    const next = document.querySelector(
      `#${roomName}-${device.name}-channel-next`
    )
    const prev = document.querySelector(
      `#${roomName}-${device.name}-channel-prev`
    )

    const volumeInput = document.querySelector(
      `#${roomName}-${device.name}-volume-input`
    )
    const quieter = document.querySelector(
      `#${roomName}-${device.name}-volume-down`
    )
    const louder = document.querySelector(
      `#${roomName}-${device.name}-volume-up`
    )

    channelOptions.addEventListener('change', () => {
      const selectedChannelIndex = channelOptions.selectedIndex
      device.switchChannelByName(selectedChannelIndex, roomName)
    })

    next.addEventListener('click', () => {
      device.switchToNextChannel(roomName)
      next.classList.add('is-active')
      prev.classList.remove('is-active')
    })
    prev.addEventListener('click', () => {
      device.switchToPrevChannel(roomName)
      prev.classList.add('is-active')
      next.classList.remove('is-active')
    })

    volumeInput.addEventListener('change', () => {
      device.adjustVolume(volumeInput)
    })

    quieter.addEventListener('click', () => {
      device.quieterVolume(volumeInput)
      quieter.classList.add('is-active')
      louder.classList.remove('is-active')
    })
    louder.addEventListener('click', () => {
      device.louderVolume(volumeInput)
      louder.classList.add('is-active')
      quieter.classList.remove('is-active')
    })
  }
  return
}
