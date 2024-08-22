import { Device } from './device.js'
import {
  renderPowerController,
  // renderControlButtons,
} from '../ui/render-elements.js'

export class Hood extends Device {
  constructor(name, powValue = 30) {
    super(name)
    this.powValue = powValue
  }

  power(value) {
    this.powValue = value
    console.log(`${this.name} power is set to${this.powValue}`)
  }

  getIcon() {
    return 'fa-solid fa-wind'
  }

  renderDeviceOptions(roomName) {
    return `${renderPowerController({
      min: 0,
      max: 100,
      value: this.powValue,
      deviceParam: 'power',
      name: this.name,
      roomName,
      unit: 'RPM',
    })}`
  }

  getStatus() {
    return {
      ...super.getStatus(),
      power: this.powValue,
    }
  }
}

// getStatus() {
//   return {
//     isOn: this.isOn,
//     power: this.powValue,
//   }
// }

// render(roomName) {
//   return `
//   <div class="device">
//     <h3 class="device__title">${this.name}</h3>
//     <i class="fa-solid fa-wind"></i>
//     ${renderPowerController({
//       min: 0,
//       max: 100,
//       value: this.powValue,
//       deviceParam: 'power',
//       name: this.name,
//       roomName,
//       unit: 'RPM',
//     })}
//     ${renderControlButtons('Hood', this.name, roomName)}
//   </div>
//   `
// }
