const mongoose = require('mongoose')

const punishment = mongoose.Schema({
    guildID: String,
    memberID: String,
    punishID: Number,
    type: String,
    moderatorId: String,
    reason: String,
    date: Date,
})

module.exports = mongoose.model('punishments', punishment)
