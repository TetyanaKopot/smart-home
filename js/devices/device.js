import { renderControlButtons } from '../ui/render-elements.js'
// import { controlActions } from '../config.js'

export class Device {
  constructor(name) {
    this.name = name
    this.isOn = false
  }

  on() {
    this.isOn = true
    console.log(`${this.name} is turned on`)
  }

  off() {
    this.isOn = false
    console.log(`${this.name} is turned off`)
  }

  render(roomName) {
    return `
    <div class="device">
    <h3 class="device__title">${this.name}</h3>
    <i class="${this.getIcon()}"></i>
    ${this.renderDeviceOptions(roomName)}
    ${renderControlButtons(this.constructor.name, this.name, roomName)}
    </div>
    `
  }

  getIcon() {
    return 'fa-solid fa-question'
  }

  renderDeviceOptions() {
    return ''
  }

  getStatus() {
    return {
      isOn: this.isOn,
    }
  }
}

// performAction(action, roomName) {
//   switch (action) {
//     case 'on':
//     case 'start':
//     case 'open':
//       this.isOn = true
//       console.log(`${this.name} is ${action}ed in ${roomName}`)
//       break
//     case 'off':
//     case 'stop':
//     case 'close':
//       this.isOn = false
//       console.log(`${this.name} is ${action}ed in ${roomName}`)
//       break
//     default:
//       console.log(`Action ${action} is not recognized for ${this.name}`)
//   }
// }
