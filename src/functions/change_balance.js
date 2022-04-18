const User = require('../../models/user')

async function changeBalance(accountId, type, value) {

    let user = await User.findOne({ accountId })

    switch (type) {
        case 'deb':
            await User.findOneAndUpdate({ accountId }, { balance: user.balance + value }, { new: true })
            break
        case 'cred':
            User.findOneAndUpdate({ accountId }, { balance: user.balance - value }, { new: true }, (err, user) =>{
                if(err) console.log(err)
                if(user.balance < 0) console.log('You are accumulating credit')
            })
            break
    }
}

module.exports = changeBalance