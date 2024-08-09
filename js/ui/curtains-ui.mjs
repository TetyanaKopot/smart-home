export function renderCurtains() {
  return `
        <div class="device">
            <h3 class="device__title">Curtains</h3>
            <i class="fa-regular fa-window-maximize"></i>
            <div class="control-buttons">
                <button class="device-button off" id="curtains-close">Close</button>
                <button class="device-button on" id="curtains-open">Open</button>
            </div>
        </div>
    `
}
