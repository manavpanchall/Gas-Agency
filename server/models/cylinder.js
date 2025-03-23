const mongoose = require('mongoose');

const cylinderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    bodyweight: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        alias: 'phonenumber'
    },
    imageurls: [{
        type: String,
        required: true
    }]
});


const Cylinder = mongoose.model('Cylinder', cylinderSchema);

module.exports = Cylinder;