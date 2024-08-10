import { Device } from './device.js'

export class Television extends Device {
  constructor(name, channels) {
    super(name)
    this.channels = channels
    this.currentChannel = null
    this.volume = 10
  }
  switchChannel(channelNumber) {
    if (
      this.isOn &&
      channelNumber > 0 &&
      channelNumber < this.channels.length
    ) {
      this.currentChannel = channels[channelNumber]
      console.log(`Switch to channel ${this.currentChannel}`)
    } else {
      console.log('Invalid channel or TV is OFF')
    }
  }

  adjustVolume(volumeLevel) {
    if (this.isOn) {
      this.volume = Math.min(Math.max(volumeLevel, 0), 100)
      console.log(`Volume set to ${this.volume}`)
    } else {
      console.log('Cannot adjust volume. TV is OFF')
    }
  }

  getChannelList() {
    return this.channels
  }
}

export const channels = ['BBC', 'CNN', 'National Geographic', 'Discovery']
const myTV = new Television('Living-room TV', channels)
