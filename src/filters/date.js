export default (value) => {
  const date = new Date(value)
  return date.toLocaleString(['en-US'], {month: 'short', day: '2-digit', year: 'numeric', hour12: false, hour: 'numeric', minute: '2-digit'})
}
