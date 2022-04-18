const Redis = require('ioredis')

const cache = new Redis({
    host: 'redis'
})

if(cache) console.log('Cache Connected')

class Cache {
    async get(key) {
        console.log('Get in CACHE:', key)
        const value = await cache.get(key)
        return value ? JSON.parse(value) : null
    }

    set(key, value) {
        console.log('Set in CACHE:', key, value)
        return cache.set(key, JSON.stringify(value))
    }

    del(key) {
        return cache.del(key)
    }

    async getAll(){
        let values = await cache.keys('*')
        let arrValues = await Promise.all(values.map(async(key) => {
            return await cache.get(key)
        }))
        return arrValues
    }

    flushall(){
        return cache.flushall()
    }
}

module.exports = new Cache()