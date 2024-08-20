import { Device } from './device.js'
import {
  renderControlButtons,
  renderSelectOptions,
} from '../ui/render-elements.js'

const channels = ['BBC', 'CNN', 'HBO', 'Discovery']
export class Television extends Device {
  constructor(name, channels = ['No channel available']) {
    super(name)
    this.channels = channels
    this.currentChannel = this.channels[0]
    this.volume = 10
  }
  switchChannel(channelNumber) {
    if (
      this.isOn &&
      channelNumber >= 0 &&
      channelNumber < this.channels.length
    ) {
      this.currentChannel = this.channels[channelNumber]
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

  getStatus() {
    return {
      isOn: this.isOn,
      currentChannel: this.currentChannel,
      volume: this.volume,
    }
  }

  render(roomName) {
    return `
    <div class="device">
      <h3 class="device__title">${this.name}</h3>
      ${renderSelectOptions(roomName, this.name, channels, 'channel')}
      <div class="channel-buttons">
        <button class="device-button id="${roomName}-${
      this.name
    }-channel-prev">Prev</button>
        <span>CNN</span>
        <button class="device-button id="${roomName}-${
      this.name
    }-channel-next">Next</button>
      </div>
      <div class="volume-buttons">
        <button class="device-button id="${roomName}-${
      this.name
    }-volume-down">Vol-</button>
        <span>20</span>
        <button class="device-button id="${roomName}-${
      this.name
    }-volume-up">Vol+</button>
      </div>
      ${renderControlButtons('Television', this.name, roomName)}
    </div>    
    `
  }
}

const myTV = new Television('Living-room TV', channels)
