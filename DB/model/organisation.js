const mongoose = require('mongoose');

const organizationSchema = mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        trim: true,
    },
    branchLocation: {
        type: String,
        required: true,
        trim: true,
    },
    coordinates: {
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        }
    },
    officeStartTime: {
        type: String, // 'HH:mm' format
        required: true,
    },
    officeEndTime: {
        type: String, // 'HH:mm' format
        required: true,
    },
    floorCoordinates: [
        {
            floorNumber: {
                type: Number,
                required: true,
            },
            coordinates: {
                latitude: {
                    type: Number,
                    required: true,
                },
                longitude: {
                    type: Number,
                    required: true,
                }
            },
        }
    ],
    contactEmail: {
        type: String,
        required: true,
        match: [/.+@.+\..+/, 'Invalid email format'],
    },
    contactPhone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 15,
        match: [/^\d+$/, 'Invalid phone number'],
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
});

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;
