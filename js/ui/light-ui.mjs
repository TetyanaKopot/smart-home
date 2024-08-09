export function renderLight() {
  return `
        <div class="device">
            <h3 class="device__title">Lights</h3>
            <i class="fa-solid fa-lightbulb"></i>
            <div class="light-colors">
                <button type="button" class="light-color white">W</button>
                <button type="button" class="light-color yellow">Y</button>
                <button type="button" class="light-color red">R</button>
                <button type="button" class="light-color green">G</button>
                <button type="button" class="light-color blue">B</button>
            </div>
            <input type="range" id="light-brightness" min="0" max="100" value="50">
            <span id="brightness">50%</span>
            <div class="control-buttons">
                <button class="device-button off" id="light-off">Off</button>
                <button class="device-button on" id="light-on">On</button>
            </div>
        </div>
    `
}
