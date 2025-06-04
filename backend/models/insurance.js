const mongoose = require('mongoose');

const insuranceSchema = mongoose.Schema({
  planName: { type: String },
  type: { type: String },
  coverage: { type: String },
  exclusions: { type: String },
  premium: { type: Number },
  validity: { type: String },
  eligibility: { type: String },
  addOns: { type: [String] },
  vehicleType: { type: String },

  name: { type: String, required: true },
  email: { type: String, required: true },
  vehicleNo: { type: String, required: true },
  address: { type: String, required: true },
  mobile: { type: String, required: true },
  location: { type: String, required: true },

vehiclePhotos: { type: [String] },
  status: { type: String, default: 'Pending' },

 planDateCreated: {
  type: Date
},
insuranceDateCreated: {
  type: Date,
  default: Date.now
},
policyNumber: { type: String, unique: true },
agentemail: { type: String, default: "" },  // ✅ optional field
mobile1: { type: String },  // ✅ optional field

});

insuranceSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

insuranceSchema.set('toJSON', {
  virtuals: true,
});

exports.Insurance = mongoose.model('Insurance', insuranceSchema);
