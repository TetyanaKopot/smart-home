import { renderControlButtons } from './render-buttons.js'

export const renderAirConditioner = () => {
  return `
        <div class="device">
            <h3 class="device__title">AC</h3>
            <i class="fa-solid fa-fan"></i>
            <div class="temperature-controller">
                <input type="range" id="ac-temperature" min="15" max="30" value="22">
                <span id="brightness">22°C</span>
            </div>
            ${renderControlButtons()}
        </div>
    `
}
