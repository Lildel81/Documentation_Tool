const mongoose = require('mongoose');
const Joi = require('joi');

const supplementalReportSchema = new mongoose.Schema({

    caseNumber: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },

    reportTitle: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },

    reportDate: {
        type: String,
        required: true
    },

    narrative: {
        type: String,
        required: true,
        trim: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

const SupplementalReport =
    mongoose.model(
        'SupplementalReport',
        supplementalReportSchema
    );


const validateSupplementalReport = (report) => {

    const schema = Joi.object({

        caseNumber:
            Joi.string()
                .trim()
                .max(100)
                .required(),

        reportTitle:
            Joi.string()
                .trim()
                .max(200)
                .required(),

        reportDate:
            Joi.string()
                .required(),

        narrative:
            Joi.string()
                .trim()
                .required()

    });

    return schema.validate(report);
};


module.exports = SupplementalReport;
module.exports.validate = validateSupplementalReport;