var mongoose = require('mongoose');
var Schema = mongoose.Schema

var storeSchema = new Schema({
  storeId: Number,
  name: String,
  address: String
});

var Stores = mongoose.model('Stores', storeSchema, 'Stores')

module.exports = Stores;