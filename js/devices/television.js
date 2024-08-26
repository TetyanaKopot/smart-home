import { Device } from './device.js'

const channels = ['BBC', 'CNN', 'HBO', 'FOX', 'NBC', 'Discovery', 'Music Disco']
export class Television extends Device {
  constructor(name) {
    super(name)
    this.channels = channels
    this.currentChannel = this.channels[0]
    this.volume = 20
    this.loadState()
  }

  renderDeviceOptions(roomName) {
    return `
    <div class="channel-buttons">
    <button class="device-button" id="${roomName}-${
      this.name
    }-channel-prev">Prev</button>
    <input list="channels" class="channel-input" id="channel-input">
      <datalist id="channels">
      ${channels
        .map((channel) => `<option value="${channel}">${channel}</option>`)
        .join('')}
      </datalist>
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

  getIcon() {
    return `fa-solid fa-tv`
  }

  getChannelList() {
    return this.channels
  }

  switchChannelByName(channelInput) {
    if (this.isOn) {
      const channelIndex = this.channels.indexOf(channelName)
      console.log(channelName)
      if (channelIndex !== -1) {
        this.currentChannel = this.channels[channelIndex]
        channelInput.value = this.currentChannel
        console.log(`Switched to channel ${this.currentChannel}`)
      } else {
        console.log('Channel not found.')
      }
    }
  }

  filterChannels(inputValue) {
    if (!inputValue) return this.channels
    return this.channels.filter((channel) =>
      channel.toLowerCase().startsWith(inputValue.toLowerCase())
    )
  }

  setChannelsValue(channelInput) {
    const filteredChannels = this.filterChannels(channelInput.value)
    const datalist = document.querySelector('#channels')
    datalist.innerHTML = ''
    filteredChannels.forEach((channel) => {
      const option = document.createElement('option')
      option.value = channel
      option.textContent = channel
      datalist.appendChild(option)
    })
  }

  switchToNextChannel(channelInput) {
    if (this.isOn) {
      let currentIndex = channels.indexOf(this.currentChannel)
      let nextIndex = (currentIndex + 1) % channels.length
      const nextChannel = channels[nextIndex]
      this.currentChannel = nextChannel
      channelInput.value = this.currentChannel
      console.log(`Switched to channel ${this.currentChannel}`)
    } else {
      console.log('TV is OFF. Cannot switch channel.')
    }
  }

  switchToPrevChannel(channelInput) {
    if (this.isOn) {
      const currentIndex = channels.indexOf(this.currentChannel)
      let prevIndex =
        currentIndex === 0 ? channels.length - 1 : currentIndex - 1
      this.currentChannel = channels[prevIndex]
      channelInput.value = this.currentChannel
      console.log(`Switched to channel ${this.currentChannel}`)
    } else {
      console.log('TV is OFF. Cannot switch channel.')
    }
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

  getStatus() {
    return {
      ...super.getStatus(),
      currentChannel: this.currentChannel,
      volume: this.volume,
    }
  }

  loadState() {
    super.loadState()
    const state = JSON.parse(localStorage.getItem(this.name))
    if (state) {
      this.currentChannel = state.currentChannel
      this.volume = state.volume
    }
  }
}
