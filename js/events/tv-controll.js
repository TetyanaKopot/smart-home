import { Television } from '../devices/television.js'

export const handleTvControll = (device, roomName) => {
  if (device instanceof Television) {
    const channelInput = document.querySelector('#channel-input')
    const channelOptions = document.querySelector('#channels')

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

    channelInput.addEventListener('input', () => {
      device.setChannelsValue(channelInput.value)
      device.saveState(roomName)
      // syncUIWithStorage(device, roomName)
    })

    channelOptions.addEventListener('change', () => {
      const selectedChannelName = channelOptions.value
      device.switchChannelByName(selectedChannelName, channelInput)
      device.saveState(roomName)
      // syncUIWithStorage(device, roomName)
    })

    next.addEventListener('click', () => {
      device.switchToNextChannel(channelInput)
      next.classList.add('is-active')
      prev.classList.remove('is-active')
      device.saveState(roomName)
      // syncUIWithStorage(device, roomName)
    })
    prev.addEventListener('click', () => {
      device.switchToPrevChannel(channelInput)
      prev.classList.add('is-active')
      next.classList.remove('is-active')
      device.saveState(roomName)
      // syncUIWithStorage(device, roomName)
    })

    volumeInput.addEventListener('change', () => {
      if (volumeInput.value.length > 2) {
        volumeInput.value = volumeInput.value.slice(0, 2)
      }
      device.adjustVolume(volumeInput)
      device.saveState(roomName)
      // syncUIWithStorage(device, roomName)
    })

    quieter.addEventListener('click', () => {
      device.quieterVolume(volumeInput)
      quieter.classList.add('is-active')
      louder.classList.remove('is-active')
      device.saveState(roomName)
      // syncUIWithStorage(device, roomName)
    })

    louder.addEventListener('click', () => {
      device.louderVolume(volumeInput)
      louder.classList.add('is-active')
      quieter.classList.remove('is-active')
      device.saveState(roomName)
      // syncUIWithStorage(device, roomName)
    })
  }
  return
}
