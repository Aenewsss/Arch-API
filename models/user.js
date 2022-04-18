const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    accountId: { type: String, minLength: [4, 'AccountId must be at least 4 digits'] },
    balance: { type: Number, required: true }
});

module.exports = mongoose.model('User', userSchema);