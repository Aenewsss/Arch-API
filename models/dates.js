const mongoose = require('mongoose');

const dateSchema = mongoose.Schema({
    date: { type: String, required: true },
    transactions: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' 
    }] 
});

module.exports = mongoose.model('Date', dateSchema);