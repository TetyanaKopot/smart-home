export const initializeTimer = (duration, onUpdate, onComplete) => {
  let timeInSeconds = duration
  let timer

  const tick = () => {
    if (timeInSeconds > 0) {
      timeInSeconds--

      const hrs = Math.floor(timeInSeconds / 3600)
      const mins = Math.floor((timeInSeconds % 3600) / 60)
      const secs = Math.floor(timeInSeconds % 60)

      if (onUpdate) onUpdate(hrs, mins, secs)

      timer = setTimeout(tick, 1000)
    } else {
      if (onComplete) onComplete()
    }
  }
  timer = setTimeout(tick, 1000)
  return () => clearTimeout(timer)
}

export const formatTime = (value) => {
  return value < 10 ? `0${value}` : value
}
