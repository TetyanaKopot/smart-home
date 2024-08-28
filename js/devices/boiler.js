import { renderPowerController } from '../ui/render-elements.js'
import { AirConditioner } from './air-conditioner.js'

export class Boiler extends AirConditioner {
  constructor(name, roomName, tempValue = 50) {
    super(name, tempValue)
    this.roomName = roomName
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

  getIcon() {
    return 'fa-brands fa-hotjar'
  }
}
