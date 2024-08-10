import {
  renderControlButtons,
  renderTimer,
  renderPowerController,
} from './render-elements.js'

export const renderOven = () => {
  return `
    <div class="device">
      <h3 class="device__title">Oven</h3>
      <i class="fa-solid fa-fire"></i>
      ${renderTimer()}
      ${renderPowerController(50, 360, 180)}
      ${renderControlButtons()}
    </div>
  `
}
