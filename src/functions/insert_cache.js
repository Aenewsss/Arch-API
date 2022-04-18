const User = require('../../models/user')
const cache = require('../redis/cache')

function insertCache(){
    User.find({}, async (err, users) => {
        if (err) console.log(err)
        if (users.length) {
            console.log('Setting cache')
            users.forEach(user => {
                cache.set(JSON.stringify(user.accountId), { accountId: user.accountId, balance: user.balance })
            })
        }
    })
}

module.exports = insertCache