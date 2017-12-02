const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

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
        }
    },
    {
        toJSON: {
            getters: true,
            versionKey: false,
            transform: (doc, ret) => {
                delete ret._id;

                return ret;
            }
        }
    }
);

organizationSchema.plugin(mongooseDelete, {
    overrideMethods: true,
    validateBeforeDelete: false
});

organizationSchema.path('deleted').select(false);

const Organization = mongoose.model('Organization', organizationSchema);