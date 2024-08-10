import {
  renderControlButtons,
  renderTimer,
  renderPowerController,
} from './render-elements.js'

export const renderWashingMachine = () => {
  return `
      <div class="device">
        <h3 class="device__title">Washing Machine</h3>
        <i class="fa-solid fa-soap"></i>
        ${renderTimer()}
        ${renderPowerController(50, 360, 180)}
        ${renderControlButtons()}
      </div>
    `
}
