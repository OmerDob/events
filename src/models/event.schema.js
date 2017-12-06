const mongoose = require('mongoose');
const removeJsonFields = require('./plugins/removeJsonFields.plugin');

const Schema = mongoose.Schema;

const eventSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 100
        },
        description: {
            type: String,
            maxlength: 500
        },
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        },
        location: {
            type: String,
            maxlength: 100
        }
    },
    {
        softDelete: true,
        toJSON: {
            getters: true,
            versionKey: false
        }
    }
);

eventSchema.plugin(removeJsonFields, ['_id', 'deleted']);

module.exports = eventSchema;