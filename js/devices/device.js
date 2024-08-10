export class Device {
  constructor(name) {
    this.name = name
    this.isOn = false
  }

  turnOn() {
    this.isOn = true
    console.log(`${this.name} is turned on`)
  }

  turnOff() {
    this.isOn = false
    console.log(`${this.name} is turned off`)
  }
}
