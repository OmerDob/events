module.exports = app => {
    app.use('/organization', require('./routers/organization.router'));
};