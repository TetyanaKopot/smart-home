import { AirConditioner } from '../devices/air-conditioner.js'
import { Boiler } from '../devices/boiler.js'
import { Curtains } from '../devices/curtains.js'
import { Door } from '../devices/door.js'
import { Hood } from '../devices/hood.js'
import { Light } from '../devices/light.js'
import { Oven } from '../devices/oven.js'
import { Television } from '../devices/television.js'
import { WashingMachine } from '../devices/washing-machine.js'

export const rooms = [
  {
    name: 'LivingRoom',
    devices: [
      new Door('Door', 'LivingRoom'),
      new Light('Light', 'LivingRoom'),
      new Curtains('Curtains', 'LivingRoom'),
      new AirConditioner('AC', 'LivingRoom'),
      new Television('Television', 'LivingRoom'),
    ],
  },
  {
    name: 'Bedroom',
    devices: [
      new Light('Light', 'Bedroom'),
      new Curtains('Curtains', 'Bedroom'),
      new AirConditioner('AC', 'Bedroom'),
    ],
  },
  {
    name: 'Kitchen',
    devices: [
      new Light('Light', 'Kitchen'),
      new Curtains('Curtains', 'Kitchen'),
      new Oven('Oven', 'Kitchen'),
      new Hood('Hood', 'Kitchen'),
    ],
  },
  {
    name: 'UtilityRoom',
    devices: [
      new Light('Light', 'UtilityRoom'),
      new WashingMachine('WashingMachine', 'UtilityRoom'),
      new Boiler('Boiler', 'UtilityRoom'),
    ],
  },
]
