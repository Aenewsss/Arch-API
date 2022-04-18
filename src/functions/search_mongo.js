const User = require('../../models/user')

async function searchMongo(accountId){
    let user = await User.findOne({ accountId: accountId })
    if(user){
        console.log('User in MONGO')
        return user
    }
    return user
}

module.exports = searchMongo
