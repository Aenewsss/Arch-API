const todayDate = require('../variables/today_date')
const newTransaction = require('../functions/new_transaction')
const changeBalance = require('../functions/change_balance')

const Dates = require('../../models/dates')

async function verifyDate(req, res, next) {
    try {
        let accountId = res.user.accountId
        let { type, value } = req.body
    
        let date = await Dates.findOne({ date: todayDate }).populate('transactions')
        let transaction = await newTransaction(accountId, type, value)

        changeBalance(transaction.accountId, type, Number(value))

        if (!date) {
            let newDate = new Dates({ date: todayDate, transactions: transaction.id })
            await newDate.save()
        } else {
            date.transactions.push(transaction)
            await date.save()
        }
        next()
    } catch (err) {
        res.send(err.message)
    }
}

module.exports = verifyDate