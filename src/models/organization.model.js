const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const organizationSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            maxlength: 100
        },
        creationDate: {
            type: Date,
            default: Date.now()
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

mongoose.model('Organization', organizationSchema);