import {
  renderPowerController,
  renderControlButtons,
} from './render-elements.js'

export const renderHood = () => {
  return `
    <div class="device">
      <h3 class="device__title">Hood</h3>
      <i class="fa-solid fa-wind"></i>
      ${renderPowerController(0, 100, 30)}
      ${renderControlButtons('off', 'on')}
    </div>
    `
}
