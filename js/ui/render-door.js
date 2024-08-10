import { renderControlButtons } from './render-elements.js'

export const renderDoor = () => {
  return `
    <div class="device">
      <h3 class="device__title">Door</h3>
        <i class="fa-solid fa-door-open"></i> 
      ${renderControlButtons('close', 'open')}
    </div>
    `
}
