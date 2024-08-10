import {
  renderControlButtons,
  renderPowerController,
} from './render-elements.js'

export const renderLight = () => {
  return `
    <div class="device">
      <h3 class="device__title">Lights</h3>
      <i class="fa-solid fa-lightbulb"></i>
      <div class="light-colors">
        <button type="button" class="light-color white" id="white-light">W</button>
        <button type="button" class="light-color yellow" id="yellow-light">Y</button>
        <button type="button" class="light-color red" id="red-light">R</button>
        <button type="button" class="light-color green" id="green-light">G</button>
        <button type="button" class="light-color blue" id="blue-light">B</button>
      </div>
      ${renderPowerController(0, 100, 50)}
      ${renderControlButtons('off', 'on')}
    </div>
    `
}
