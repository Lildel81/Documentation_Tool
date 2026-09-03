const mongoose = require('mongoose');

const Joi = require('joi');

const clientSchema = new mongoose.Schema({

    title: {
        type: String,
        minlength: 1,
        maxlength: 500,
        required: true
    },

    caseNumber: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },

    requestReceived: {
        type: String,
        minlength: 1,
        maxlength: 20,
        required: true
    },

    started: {
        type: String,
        minlength: 1,
        maxlength: 20,
        required: true
    },

    requestingAgency: {
        type: String,
        minlength: 1,
        maxlength: 500,
        required: false
    },

    typeOfInvestigation: {
        type: String,
        require: true
    },

    hoursSpent: {
        type: String,
        minlength: 1,
        maxlength: 10,
        required: true
    },

    actionTaken: [{
        type: String,
        enum: [
            'Tracked',
            'Discovered',
            'Connected',
            'Identified',
            'Corroborated',
            'Analyzed',
            'Attributed',
            'Exhausted'
        ]
    }],

    softwareUsed: {
        type: String,
        minlength: 1,
        maxlength: 500,
        required: true
    },

    paidOrFree: {
        type: String,
        enum:['Free', 'Trial / Pilot', 'License Pending', 'Licensed'],
        required: true
    },

    softwareVersion: {
        type: String,
        minlength: 1,
        maxlength: 50,
        required: false
    },

    notes: {
        type: String,
        minlength: 1,
        maxlength: 5000,
        required: false
    }, 

    reportComplete: {
        type: String,
        enum: ['Yes', 'No'],
        required: true
    },
    providedToInvestigator: {
        type: String,
        enum: ['Yes', 'No'],
        required: true
    },

    providedHow: {
        type: String,
        minlength: 1,
        maxlength: 50,
        required: false
    },

    evidenceStored: {
        type: String,
        minlength: 1,
        maxlength: 1000,
        required: true
    },

    results: {
        type: String,
        minlength: 1,
        maxlength: 5000,
        required: false
    },

    migratedToKaseware: {
        type: Boolean,
        default: false
    },

    kasewareRecordId: {
        type: String,
        maxlength: 100,
        required: false
    }
    
})

const Client = mongoose.model('Client', clientSchema);

const validateClient = (client) => {
    const schema = Joi.object({
        title: Joi.string().min(1).max(500).required(),
        caseNumber:
    Joi.string().trim().max(100).required(),
        requestReceived: Joi.string().min(1).max(20).required(),
        started: Joi.string().min(1).max(20).required(),
        requestingAgency: Joi.string().min(1).max(500),
        typeOfInvestigation: Joi.string().required(),
        hoursSpent: Joi.string().min(1).max(10).required(),
        actionTaken: Joi.array()
    .items(
        Joi.string().valid(
            'Tracked',
            'Discovered',
            'Connected',
            'Identified',
            'Corroborated',
            'Analyzed',
            'Attributed',
            'Exhausted'
        )
    )
    .min(1)
    .required(),
        softwareUsed: Joi.string().min(1).max(500).required(),
        paidOrFree: Joi.string().valid('Free', 'Trial / Pilot', 'License Pending', 'Licensed').required(),
        softwareVersion: Joi.string().min(1).max(50),
        notes: Joi.string().min(1).max(5000),
        reportComplete: Joi.string().valid('Yes', 'No').required(),
        providedToInvestigator: Joi.string().valid('Yes', 'No').required(),
        providedHow: Joi.string().min(1).max(50),
        evidenceStored: Joi.string().min(1).max(1000).required(),
        results: Joi.string().min(1).max(5000),

        migratedToKaseware: Joi.boolean(),
        kasewareRecordId: Joi.string().max(100).allow('')
    });

    return schema.validate(client);

    
};

const validateMigration = (migration) => {

    const schema = Joi.object({

        migratedToKaseware:
            Joi.boolean().required(),

        kasewareRecordId:
            Joi.string()
                .max(100)
                .required()

    });

    return schema.validate(migration);
};

module.exports = Client;
module.exports.validate = validateClient;
module.exports.validateMigration = validateMigration;