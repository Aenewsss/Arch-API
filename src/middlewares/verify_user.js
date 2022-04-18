const searchMemory = require('../functions/search_memory')

async function verifyUser(req, res, next){
    try{
        const { accountId } = req.params
        
        let user = await searchMemory(accountId)

        if(user == null){
            res.user = {exists: false, accountId: accountId, balance: 0}
            next()
        }else{
            res.user = {exists: true, accountId: user.accountId, balance: user.balance}
            next()
        }
        
    }catch(err){
        res.send(err.message)
    }
}

module.exports = verifyUser