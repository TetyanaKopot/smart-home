import {
  renderControlButtons,
  renderPowerController,
} from './render-elements.js'

export const renderBoiler = () => {
  return `
      <div class="device">
        <h3 class="device__title">Boiler</h3>
        <i class="fa-brands fa-hotjar"></i>
        ${renderPowerController(15, 30, 22)}
        ${renderControlButtons()}
      </div>
      `
}
