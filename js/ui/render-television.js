import { channels } from '../devices/television.js'
import { renderControlButtons } from './render-elements.js'

export const renderTelevision = () => {
  return `
    <div class="device">
      <h3 class="device__title">TV</h3>
      <div class="channel-selector">
        <label for="channels">Select Channel:</label>
        <select id="channels">
          <option value="1">${channels[0]}</option>
          <option value="2">${channels[1]}</option>
          <option value="3">${channels[2]}</option>
          <option value="4">${channels[3]}</option>
        </select>
      </div>
      <div class="channel-buttons">
        <button class="device-button id="channel-prev">Prev</button>
        <span>CNN</span>
        <button class="device-button id="channel-next">Next</button>
      </div>
      <div class="volume-buttons">
        <button class="device-button id="volume-down">Vol-</button>
        <span>20</span>
        <button class="device-button id="volume-up">Vol+</button>
      </div>
      ${renderControlButtons('off', 'on')}
    </div>    
    `
}
