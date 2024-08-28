export const initializeTimer = (duration, onUpdate, onComplete, storageKey) => {
  let timeInSeconds = duration
  let timer

  const tick = () => {
    if (timeInSeconds > 0) {
      timeInSeconds--

      const hrs = Math.floor(timeInSeconds / 3600)
      const mins = Math.floor((timeInSeconds % 3600) / 60)
      const secs = Math.floor(timeInSeconds % 60)

      if (onUpdate) onUpdate(hrs, mins, secs)
      if (storageKey) {
        localStorage.setItem(storageKey, JSON.stringify(timeInSeconds))
      }

      timer = setTimeout(tick, 1000)
    } else {
      if (onComplete) onComplete()
      if (storageKey) {
        localStorage.removeItem(storageKey)
      }
    }
  }
  timer = setTimeout(tick, 1000)
  return () => clearTimeout(timer)
}

export function formatTime(value) {
  return value < 10 ? `0${value}` : value
}
