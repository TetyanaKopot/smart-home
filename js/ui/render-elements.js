export const renderControlButtons = () => {
  return `
    <div class="control-buttons">
        <button class="device-button off" id="ac-off">Off</button>
        <button class="device-button on" id="ac-on">On</button>
    </div>
    `
}

export const renderPowerController = (min, max, value) => {
  return `
    <div class="power-controller">
      <input type="range" id="power-controller" min="${min}" max="${max}" value="${value}">
      <span id="power">${value}</span>
    </div>
  `
}

export const renderTimer = () => {
  return `
    <div class="timer-container">
      <p class="timer">Timer 00:00:00</p>
      <label for="hours">Hours</label>
      <input class="input-time" id="hours" placeholder="00">
      <label for="minutes">Min</label>
      <input class="input-time" id="minutes" placeholder="00">
    </div>
  `
}
