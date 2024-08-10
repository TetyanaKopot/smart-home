export const renderControlButtons = () => {
  return `
    <div class="control-buttons">
        <button class="device-button off" id="ac-off">Off</button>
        <button class="device-button on" id="ac-on">On</button>
    </div>
    `
}

export const renderHomeButton = () => {
  return `
    <button class="button" id="home">
      <i class="fa-solid fa-house"></i>
    </button>
  `
}
