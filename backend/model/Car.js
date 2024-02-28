const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    carModel: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 11
    },
    maxPictures:
    {
        type: Number,
        required: true,
        min: 1, max: 10
    },
    images: [{
        public_id: String,
        url: String
    }],
});

module.exports = mongoose.model('Car', carSchema);
