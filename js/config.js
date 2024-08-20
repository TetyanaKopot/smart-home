export const controlActions = {
  AirConditioner: { on: 'on', off: 'off' },
  Boiler: { on: 'on', off: 'off' },
  Curtains: { on: 'open', off: 'close' },
  Door: { on: 'open', off: 'close' },
  Hood: { on: 'on', off: 'off' },
  Light: { on: 'on', off: 'off' },
  Oven: { on: 'on', off: 'off' },
  Television: { on: 'on', off: 'off' },
  WashingMachine: { on: 'start', off: 'stop' },
}

export const parameterControls = {
  AirConditioner: {
    power: 'temperature',
    unit: '°C',
  },
  Boiler: {
    power: 'temperature',
    unit: '°C',
  },
  Hood: {
    power: 'power',
    unit: 'RPM',
  },
  Light: {
    power: 'brightness',
    unit: 'lm',
  },
  Oven: {
    power: 'temperature',
    unit: '°C',
  },
  WashingMachine: {
    power: 'temperature',
    unit: '°C',
  },
}
