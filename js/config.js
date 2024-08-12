export const controlActions = {
  AirConditioner: { on: 'on', off: 'off' },
  Boiler: { on: 'on', off: 'off' },
  Curtains: { on: 'open', off: 'close' },
  Door: { on: 'open', off: 'close' },
  Hood: { on: 'on', off: 'off' },
  Light: { on: 'on', off: 'off' },
  Oven: { on: 'on', off: 'off' },
  Television: { on: 'on', off: 'off' },
  WashingMachine: { on: 'on', off: 'off' },
}

export const parameterControls = {
  AirConditioner: { power: 'temperature' },
  Boiler: { power: 'temperature' },
  Hood: { power: 'power' },
  Light: { power: 'brightness' },
  Oven: { power: 'temperature' },
  WashingMachine: { power: 'temperature' },
}
