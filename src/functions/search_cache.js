const cache = require('../redis/cache')
const searchMongo = require('../functions/search_mongo')

async function searchCache(accountId){

    const cached = await cache.get(JSON.stringify(accountId))

    if(cached){
        console.log('user in cache')
        return cached
    }
    console.log('not in cache')
    return await searchMongo(accountId)
}

module.exports = searchCache