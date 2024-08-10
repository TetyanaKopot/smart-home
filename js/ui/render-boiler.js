import {
  renderControlButtons,
  renderPowerController,
} from './render-elements.js'

export const renderBoiler = () => {
  return `
      <div class="device">
        <h3 class="device__title">Boiler</h3>
        <i class="fa-brands fa-hotjar"></i>
        ${renderPowerController(40, 60, 50)}
        ${renderControlButtons('off', 'on')}
      </div>
      `
}
