const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, default: ''},
    email: {type: String,unique: true, default: ''},
    password: {type: String, default: ''}
});

userSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser unico'
});
module.exports = mongoose.model('User', userSchema);