const Transaction = require('../../models/transaction')

async function newTransaction(accountId, type, value) {
    let transaction = new Transaction({ accountId: accountId, type: type, value: value })
    await transaction.save()
    return transaction
}

module.exports = newTransaction