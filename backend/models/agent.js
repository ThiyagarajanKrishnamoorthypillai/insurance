const mongoose = require('mongoose');


// name, email, password, phone, city.

const agentSchema = new mongoose.Schema({
  
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        default: true,
    },
   
    dateCreated: {
        type: Date,
        default: Date.now
    },
});

agentSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

agentSchema.set('toJSON', {
    virtuals: true,
});

exports.Agent = mongoose.model('Agent', agentSchema);
exports.agentSchema = agentSchema;
