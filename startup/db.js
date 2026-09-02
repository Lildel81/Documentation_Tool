const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function() {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => winston.info('✅ MongoDB connected successfully...'))
        .catch(err => console.error('❌ Could not connect to MongoDB:', err));

};