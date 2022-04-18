const Redis = require('ioredis')

require('dotenv').config

const memoryRedis = new Redis({
    host: 'redis'
})

if (memoryRedis) console.log('Redis Connected')

class MemoryRedis {
    async get(key) {
        console.log('Get in MEMORY:', key)
        const value = await memoryRedis.get(key)
        return value ? JSON.parse(value) : null
    }

    set(key, value, timeExp) {
        console.log('Set in MEMORY:', key, value)
        return memoryRedis.set(key, JSON.stringify(value), "EX", timeExp)
    }

    del(key) {
        return memoryRedis.del(key)
    }

    flushall() {
        return memoryRedis.flushall()
    }
}

module.exports = new MemoryRedis()