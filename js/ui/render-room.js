export const renderRoom = (room) => {
  const deviceHtml = room.devices.map((device) => device()).join('')
  return `
    <button class="button" id="home">
        <i class="fa-solid fa-house"></i>
    </button>
    <h2>${room.name} devices</h2>
    <div class="devices-wrapper">
      ${deviceHtml}
    </div>
  `
}
