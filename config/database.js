const mongoose = require('mongoose');
require('dotenv').config

mongoose.connect('mongodb://mongo:27017/app_arch')
    .then(()=> {console.log('Connected to MongoDB')})
    .catch((err) => {console.log('Mongo failed trying to start\n', err.message)})