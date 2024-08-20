import { controlActions } from '../config.js'

export const renderSelectOptions = (roomName, name, options, type) => {
  return `
    <div class="option-selector">
      <label for="${roomName}-${name}-${type}" id="${roomName}-${name}-${type}-label">Select ${type}:</label>
      <select id="${roomName}-${name}-${type}-select">
        ${options
          .map((option, index) => `<option value="${index}">${option}</option>`)
          .join('')}
      </select>
    </div>
  `
}

export const renderTimer = (name, roomName) => {
  return `
  <div class="timer-container">
  <p class="timer" id="${roomName}-${name}-timer">Timer 00:00:00</p>
  <label for="hours">Hours</label>
  <input class="input-time" id="${roomName}-${name}-hours" placeholder="00">
  <label for="minutes">Min</label>
  <input class="input-time" id="${roomName}-${name}-minutes" placeholder="00">
  </div>
  `
}

export const renderPowerController = ({
  min,
  max,
  value,
  deviceParam,
  name,
  roomName,
  unit = '',
}) => {
  return `
  <div class="power-controller">
  <input type="range" id="${roomName}-${name}-${deviceParam}" min="${min}" max="${max}" value="${value}">
  <span id="${roomName}-${name}-${deviceParam}-value">${value}${unit}</span>
  </div>
  `
}

export const renderControlButtons = (deviceTipe, name, roomName) => {
  const actions = controlActions[deviceTipe] || { on: 'on', off: 'off' }
  return `
  <div class="control-buttons">
  <button class="device-button on" id="${roomName}-${name}-${actions.on}">${actions.on}</button>
  <button class="device-button off is-active" id="${roomName}-${name}-${actions.off}">${actions.off}</button>
    </div>
    `
}
