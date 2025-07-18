const mongoose = require('mongoose')

const trackSchema = new mongoose.Schema({
  plate: { type: String, required: true, unique: true },
  model: String,
  status: { type: String, enum: ['On Route', 'Idle', 'Maintenance'], default: 'Idle' },
  lastServiceDate: Date,
  driver: String
}, {timestamps: true});

module.exports = mongoose.model("Truck", trackSchema);
