const mongoose = require('mongoose');
const fullDate = require('../src/variables/today_date_hours')

const transactionSchema = mongoose.Schema({
    accountId: { type: Number, required: true },
    value: { type: Number, required: true },
    type: { 
        type: String, 
        required: true, 
        enum: { 
            values: ['deb', 'cred'], 
            message: "Invalid value for 'type', try using 'deb' or 'cred'" 
        }
    },
    date: { type: String, default: fullDate }
});

module.exports = mongoose.model('Transaction', transactionSchema);