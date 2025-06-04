const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
// officeremail  useremail  complaint mobile lat long status



const feedbackSchema = mongoose.Schema({
   
    email: {
        type: String,
        required: true,    
    },
    name: {
        type: String,
        required: true,    
    },
    location: {
        type: String,
        required: true,    
    },
    
    feedback: {
        type: String,
        required: true,    
    },
    dateCreated: {
        type: String, // Store as string to prevent automatic conversion to local time in MongoDB
        default: new Date().toISOString(),
    }
})


feedbackSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

feedbackSchema.set('toJSON', {
    virtuals: true,
});


exports.Feedback = mongoose.model('Feedback', feedbackSchema);
