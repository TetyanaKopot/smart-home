import {
  renderControlButtons,
  renderPowerController,
} from './render-elements.js'

export const renderAirConditioner = () => {
  return `
    <div class="device">
      <h3 class="device__title">AC</h3>
      <i class="fa-solid fa-fan"></i>
      ${renderPowerController(15, 30, 22)}
      ${renderControlButtons('off', 'on')}
    </div>
    `
}
