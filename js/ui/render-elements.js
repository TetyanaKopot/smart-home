import { controlActions } from '../config.js'

export const renderControlButtons = (deviceTipe, name, roomName) => {
  const actions = controlActions[deviceTipe] || { on: 'on', off: 'off' }
  return `
  <div class="control-buttons">
  <button class="device-button on" id="${roomName}-${name}-${actions.on}">${actions.on}</button>
  <button class="device-button off" id="${roomName}-${name}-${actions.off}">${actions.off}</button>
    </div>
    `
}

export const renderPowerController = (
  min,
  max,
  value,
  deviceParam,
  name,
  roomName
) => {
  return `
    <div class="power-controller">
      <input type="range" id="${roomName}-${name}-${deviceParam}" min="${min}" max="${max}" value="${value}">
      <span id="${deviceParam}">${value}</span>
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
