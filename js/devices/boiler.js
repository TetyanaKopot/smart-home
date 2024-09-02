import { renderPowerController } from '../ui/render-elements.js'
import { AirConditioner } from './air-conditioner.js'

export class Boiler extends AirConditioner {
  constructor(name, roomName, tempValue = 50) {
    super(name, tempValue)
    this.roomName = roomName
  }

  renderDeviceOptions(roomName) {
    const validTempValue =
      typeof this.tempValue === 'number' && !isNaN(this.tempValue)
        ? this.tempValue
        : 50
    return `${renderPowerController({
      min: 40,
      max: 60,
      value: validTempValue,
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
