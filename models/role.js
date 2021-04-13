const { Schema, model } = require('mongoose');

const schemaRole = Schema({
    role: {
        type: String,
        required: [true, 'the rol is required']
    }
})

module.exports = model('role', schemaRole);