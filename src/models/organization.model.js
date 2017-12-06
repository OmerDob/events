const mongoose = require('mongoose');
const eventSchema = require('./event.schema');
const removeJsonFields = require('./plugins/removeJsonFields.plugin');

const Schema = mongoose.Schema;

const organizationSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            maxlength: 100,
            validate: {
                validator: async function (name) {
                    let organization = await Organization.findOne({name});

                    if (organization && organization.id != this.id) {
                        return false;
                    }

                    return true;
                },
                message: 'Organization with the name "{VALUE}" already exists.'
            }
        },
        creationDate: {
            type: Date,
            default: Date.now(),
            required: true
        },
        description: {
            type: String,
            maxlength: 500
        },
        events: {
            type: [eventSchema],
            populate: false
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

organizationSchema.plugin(removeJsonFields, ['_id', 'deleted']);

const Organization = mongoose.model('Organization', organizationSchema);