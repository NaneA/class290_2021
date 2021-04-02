const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const {User_roles} = require('./../commons/util');

const Schema = mongoose.Schema;

const schema = new Schema({
    username: {
        type: String,
        minlength:4,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    firstName: {
        type: String,
        required: true,
        trim:true,
    },

    lastName: {
        type: String,
        required: true,
        trim:true,
    },
    role: {
        type: String,
        enumValues:[User_roles.admin , User_roles.customer],
        default: User_roles.customer,
    },
    failed_num: {
        type:Number,
        default:0
    },
    islocked:{
        type : Boolean,
        default : false
        
    }
}, {collection : 'users'});

schema.pre('save', function(next) {
    if(this.isModified('password')) {
        const salt = bcrypt.genSaltSync();
        this.password = bcrypt.hashSync(this.password, salt);
    }

    next();
})

module.exports = mongoose.model('User', schema);