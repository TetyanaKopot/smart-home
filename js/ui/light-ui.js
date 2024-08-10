import { renderControlButtons } from './render-buttons-ui.js'

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
            <input type="range" id="light-brightness" min="0" max="100" value="50">
            <span id="brightness">50%</span>
            ${renderControlButtons()}
        </div>
    `
}
