import { AirConditioner } from './devices/air-conditioner.js'
import { Boiler } from './devices/boiler.js'
import { Curtains } from './devices/curtains.js'
import { Door } from './devices/door.js'
import { Hood } from './devices/hood.js'
import { Light } from './devices/light.js'
import { Oven } from './devices/oven.js'
import { Television } from './devices/television.js'
import { WashingMachine } from './devices/washing-machine.js'

export const rooms = [
  {
    name: 'LivingRoom',
    devices: [
      new Door('Door'),
      new Light('Light'),
      new Curtains('Curtains'),
      new AirConditioner('AC'),
      new Television('Television'),
    ],
  },
  {
    name: 'Bedroom',
    devices: [
      new Light('Light'),
      new Curtains('Curtains'),
      new AirConditioner('AC'),
    ],
  },
  {
    name: 'Kitchen',
    devices: [
      new Light('Light'),
      new Curtains('Curtains'),
      new Oven('Oven'),
      new Hood('Hood'),
    ],
  },
  {
    name: 'UtilityRoom',
    devices: [
      new Light('Light'),
      new WashingMachine('WashingMachine'),
      new Boiler('Boiler'),
    ],
  },
]
