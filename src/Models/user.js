const mongoose = require('mongoose');

const date  = new Date
const userschema =new mongoose.Schema({
//checking on the datatype and if the field is required
"id": {
    type:Number,
    required:true },

"username": {
    type:String,
    required:true},

"Email": {
    type:String,
    required:true}
    ,
"password": {
    type:String,
    required:true},

"isAdmin":{
    type:Boolean,
    required:true},

"reg_date":{
    type:Object,
    required:true,
    default: date.toISOString() }
})



module.exports = mongoose.model('User', userschema)
