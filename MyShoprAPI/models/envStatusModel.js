var mongoose = require('mongoose');
var Schema = mongoose.Schema

var envStatusSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  isMongoRunning: Boolean,
  isMongoConnected: Boolean,
  isAPIRunning: Boolean
});

var EnvStatus = mongoose.model('EnvStatus', envStatusSchema, 'EnvStatus')

module.exports = EnvStatus;