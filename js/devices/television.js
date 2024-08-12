import { Device } from './device.js'
import { renderControlButtons } from '../ui/render-elements.js'

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
      <h3 class="device__title">TV</h3>
      <div class="channel-selector">
        <label for="channels">Select Channel:</label>
        <select id="${roomName}-${this.name}-channels">
          <option value="1">${channels[0]}</option>
          <option value="2">${channels[1]}</option>
          <option value="3">${channels[2]}</option>
          <option value="4">${channels[3]}</option>
        </select>
      </div>
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

export const channels = ['BBC', 'CNN', 'National Geographic', 'Discovery']
const myTV = new Television('Living-room TV', channels)
