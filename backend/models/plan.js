const mongoose = require('mongoose');

const planSchema = mongoose.Schema({
    
    
  planName: { type: String, required: true },
  type: { type: String, required: true },
  coverage: { type: String, required: true },
  exclusions: { type: String },
  premium: { type: Number, required: true },
  validity: { type: String },
  eligibility: { type: String },
  addOns: { type: [String], default: [] },
  vehicleType: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  adminemail: { type: String, required: true },
    
    dateCreated: {
        type: Date,
        default: Date.now
    },
})


planSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

planSchema.set('toJSON', {
    virtuals: true,
});


exports.Plan = mongoose.model('Plan', planSchema);
