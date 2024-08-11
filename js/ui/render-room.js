export const renderRoom = (room) => {
  const deviceHtml = room.devices
    .map((device) => device.render(room.name.toLowerCase()))
    .join('')
  return `
    <button class="button home-button">
      <i class="fa-solid fa-house"></i>
    </button>
    <h2>${room.name} devices</h2>
    <div class="devices-wrapper">
      ${deviceHtml}
    </div>
    `
}
