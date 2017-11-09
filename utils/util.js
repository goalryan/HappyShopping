const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 生成唯一ID
 */
const getGuid = () => {
  var timestamp = new Date().getTime();
  return `${timestamp}${Math.random().toString().split('.')[1].substring(0, 5)}`;
}

module.exports = {
  formatTime: formatTime
}
