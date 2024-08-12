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
}
