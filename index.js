const express = require('express')
const app = express()
const PORT = 3000

const cache = require('./src/redis/cache')
const memoryRedis = require('./src/redis/memory')

require('./config/database')

const verifyUser = require('./src/middlewares/verify_user')
const verifyDate = require('./src/middlewares/verify_date')

const insertCache = require('./src/functions/insert_cache')

const todayDate = require('./src/variables/today_date')

const User = require('./models/user')

app.use(express.json())

insertCache()

app.get('/', (req, res) => {
    res.send(`Today is: ${todayDate} ---- If you wanna to get your Account Balance, use route /account/:accountId`)
})

app.get('/account/:accountId', verifyUser, async (req, res) => {
    try {
        let { exists, accountId, balance } = res.user
        console.log(res.user)
        if (!exists) return res.send('User not registered')

        memoryRedis.set(JSON.stringify(accountId), { accountId, balance }, 60 * 5)

        return res.send(`User Account: ${accountId}/ User Balance: ${balance}`)

    } catch (err) {
        res.send(err.message)
    }
})

app.post('/account/:accountId', verifyUser, async (req, res) => {
    try {
        let { exists, accountId, balance } = res.user

        const cached = await cache.get(JSON.stringify(accountId))

        if (cached) return res.send('User already registered')

        if (exists) {
            cache.set(JSON.stringify(accountId), { accountId, balance })
            return res.send('User already registered')
        } else {
            let newUser = new User({ accountId: accountId, balance: 0 })
            await newUser.save()
            
            console.log('User created in Mongo')

            cache.set(JSON.stringify(accountId), { accountId, balance: newUser.balance })

            return res.send(`User registered-----Account Id: ${newUser.accountId}------Balance: ${newUser.balance}`)
        }

    } catch (err) {
        res.send(err.message)
    }

})

app.patch('/account/:accountId', verifyUser, verifyDate, async (req, res) => {
    try {
        let { accountId, balance } = res.user
        let { type, value } = req.body

        if (!res.user) return res.send('User not registered')

        cache.set(JSON.stringify(accountId), { accountId, balance })

        return res.send(`Account: ${accountId} ---- ${type} = ${value}`)

    } catch (err) {
        res.send(err.message)
    }
})

app.get('/accounts', async (req, res) => {
    try {
        const cached = await cache.getAll()

        if (cached) return res.send(`Accounts from CACHE: ${cached}`)

        User.find({}, (err, user) => {
            if (err) console.log(err)
            if (!user.length) {
                return res.send('No registered user')
            }
            cache.set(user.accountId, user.balance)
            return res.send(`Accounts from DB: ${user}`)
        })

    } catch (err) {
        res.send(err.message)
    }
})

app.get('/reload', async (req, res) => {
    try {
        console.log('cleaning cache')
        cache.flushall()
        
        insertCache()
        
        res.send('Cache balance cleaned')
    } catch (err) {
        res.send(err.message)
    }
})

app.listen(PORT, () => console.log('Server is running on port', PORT))

