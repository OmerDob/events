const mongoose = require('mongoose');
const softDeletePlugin = require('./models/plugins/softDelete.plugin');

module.exports = () => {
    mongoose.plugin(softDeletePlugin);

    require('./models/organization.model');
};