var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var autos = new Schema({
    brand: String,
    yearOfRegistration: Number,
    kilometer: {type: Number, default: 0},
    model:String,
    price: Number
});

module.exports = mongoose.model('Autos', autos);