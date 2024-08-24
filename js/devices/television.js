import { Device } from './device.js'
import { renderSelectOptions } from '../ui/render-elements.js'

export class Television extends Device {
  static channels = ['BBC', 'CNN', 'HBO', 'Discovery', 'Music Disco']
  constructor(name) {
    super(name)
    this.channels = [...Television.channels]
    this.currentChannel = this.channels[0]
    this.volume = 10
    this.pendingChannel = null
  }

  on() {
    if (this.pendingChannel) {
      this.switchChannelByName(this.pendingChannel)
      this.pendingChannel = null
    }
    super.on()
  }

  switchChannelByName(channelIndex, roomName) {
    if (this.isOn) {
      this.currentChannel = this.channels[channelIndex]
      this.setChannelsValue(roomName)
      console.log(`Switched to channel ${this.currentChannel}`)
    } else {
      this.pendingChannel = this.currentChannel
      console.log('TV is OFF. Channel will be switched when TV is ON.')
    }
  }

  switchToNextChannel(roomName) {
    if (this.isOn) {
      let currentIndex = this.channels.indexOf(this.currentChannel)
      let nextIndex = (currentIndex + 1) % this.channels.length
      const nextChannel = this.channels[nextIndex]
      this.currentChannel = nextChannel
      this.setChannelsValue(roomName)
      console.log(`Switched to channel ${this.currentChannel}`)
    } else {
      console.log('TV is OFF. Cannot switch channel.')
    }
  }

  switchToPrevChannel(roomName) {
    if (this.isOn) {
      const currentIndex = this.channels.indexOf(this.currentChannel)
      let prevIndex =
        currentIndex === 0 ? this.channels.length - 1 : currentIndex - 1
      this.currentChannel = this.channels[prevIndex]
      this.setChannelsValue(roomName)
      console.log(`Switched to channel ${this.currentChannel}`)
    } else {
      console.log('TV is OFF. Cannot switch channel.')
    }
  }

  setChannelsValue(roomName) {
    const channelInput = document.querySelector(
      `#${roomName}-${this.name}-channel-input`
    )
    channelInput.value = this.currentChannel
  }

  adjustVolume(volumeInput) {
    if (this.isOn) {
      let currentVolume = this.volume
      currentVolume = parseInt(volumeInput.value) || 0
      currentVolume = Math.max(0, Math.min(currentVolume, 100))
      this.volume = currentVolume

      console.log(`Volume set to ${this.volume}`)
    } else {
      console.log('Cannot adjust volume. TV is OFF')
    }
  }
  quieterVolume(volumeInput) {
    if (this.isOn) {
      if (this.volume > 0) {
        this.volume--
        volumeInput.value = this.volume
        console.log(`Volume decreased to ${this.volume}`)
      } else {
        console.log('Sound limits from 0 to 100')
      }
    }
  }
  louderVolume(volumeInput) {
    if (this.isOn) {
      if (this.volume < 100) {
        this.volume++
        volumeInput.value = this.volume
        console.log(`Volume increased  to ${this.volume}`)
      } else {
        console.log('Sound limits from 0 to 100')
      }
    }
  }

  getChannelList() {
    return this.channels
  }

  getStatus() {
    return {
      ...super.getStatus(),
      currentChannel: this.currentChannel,
      volume: this.volume,
    }
  }

  getIcon() {
    return ``
  }

  renderDeviceOptions(roomName) {
    return `
    ${renderSelectOptions(roomName, this.name, this.channels, 'channel')}
    <div class="channel-buttons">
      <button class="device-button" id="${roomName}-${
      this.name
    }-channel-prev">Prev</button>
      <input class="channel-input" id="${roomName}-${
      this.name
    }-channel-input" placeholder="CNN"/>
      <button class="device-button" id="${roomName}-${
      this.name
    }-channel-next">Next</button>
    </div>
    <div class="volume-buttons">
      <button class="device-button" id="${roomName}-${
      this.name
    }-volume-down">Vol-</button>
      <input class="volume-input" id="${roomName}-${
      this.name
    }-volume-input" type="number" min="0" max="99" maxlength="2" value="20"/>
      <button class="device-button" id="${roomName}-${
      this.name
    }-volume-up">Vol+</button>
    </div>
    `
  }
}
