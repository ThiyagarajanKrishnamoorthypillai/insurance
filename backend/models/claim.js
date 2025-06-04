const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  policyNumber: String,
  planName: String,
  name: String,
  email: String,
  mobile: String,
  vehicleNo: String,
  coverage: String,
  exclusions: String,
  eligibility: String,
  validity: String,
  location: String,
  agentemail: String,
  mobile1: String,

  typeOfDamage: { type: String, required: true },
  dateOfIncident: { type: String, required: true },
  photo: [String], // Array of photo paths

  status: { type: String, default: 'Pending' },
  claimDateCreated: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('Claim', claimSchema);
