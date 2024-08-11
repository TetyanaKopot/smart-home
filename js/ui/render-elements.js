export const renderControlButtons = (off, on, name, roomName) => {
  return `
  <div class="control-buttons">
  <button class="device-button on" id="${roomName}-${name}-on">${on}</button>
  <button class="device-button off" id="${roomName}-${name}-off">${off}</button>
    </div>
    `
}

export const renderPowerController = (
  min,
  max,
  value,
  sign,
  name,
  roomName
) => {
  return `
    <div class="power-controller">
      <input type="range" id="${roomName}-${name}-${sign}" min="${min}" max="${max}" value="${value}">
      <span id="${sign}">${value}</span>
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
