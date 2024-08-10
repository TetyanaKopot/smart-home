import { renderControlButtons } from './render-buttons-ui.js'

export const renderCurtains = () => {
  return `
        <div class="device">
            <h3 class="device__title">Curtains</h3>
            <i class="fa-regular fa-window-maximize"></i>
            ${renderControlButtons()}
        </div>
    `
}
