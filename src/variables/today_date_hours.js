const todayDate = require('./today_date')

let date = new Date()

date = `${todayDate} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

module.exports = date