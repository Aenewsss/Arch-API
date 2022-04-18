const memoryRedis = require('../redis/memory')
const searchCache = require("../functions/search_cache")

async function searchMemory(accountId){

    const cached = await memoryRedis.get(JSON.stringify(accountId))

    if(cached){
        console.log('user in memory')
        return cached
    } 
    console.log('not in memory')
    return await searchCache(accountId)
}

module.exports = searchMemory