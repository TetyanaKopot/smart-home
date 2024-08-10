import { renderControlButtons } from './render-buttons.js'

export const renderCurtains = () => {
  return `
        <div class="device">
            <h3 class="device__title">Curtains</h3>
            <i class="fa-regular fa-window-maximize"></i> 
            <i class="fa-solid fa-circle-half-stroke"></i>
            ${renderControlButtons()}
        </div>
    `
}
