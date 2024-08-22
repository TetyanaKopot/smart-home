// import { Device } from './device.js'
import {
  // renderControlButtons,
  renderPowerController,
} from '../ui/render-elements.js'
import { AirConditioner } from './air-conditioner.js'

export class Boiler extends AirConditioner {
  constructor(name, tempValue = 50) {
    super(name, tempValue)
  }

  getIcon() {
    return 'fa-brands fa-hotjar'
  }

  renderDeviceOptions(roomName) {
    return `${renderPowerController({
      min: 40,
      max: 60,
      value: this.tempValue,
      deviceParam: 'temperature',
      name: this.name,
      roomName,
      unit: '°C',
    })}`
  }
}

// temperature(value) {
//   this.tempValue = value
//   console.log(`${this.name} temperature is set to${this.tempValue}`)
// }

// getStatus() {
//   return {
//     isOn: this.isOn,
//     temperature: this.tempValue,
//   }
// }

// render(roomName) {
//   return `
//     <div class="device">
//       <h3 class="device__title">${this.name}</h3>
//       <i class="fa-brands fa-hotjar"></i>
//       ${renderPowerController({
//         min: 40,
//         max: 60,
//         value: this.tempValue,
//         deviceParam: 'temperature',
//         name: this.name,
//         roomName,
//         unit: '°C',
//       })}
//       ${renderControlButtons('Boiler', this.name, roomName)}
//     </div>
//     `
// }
