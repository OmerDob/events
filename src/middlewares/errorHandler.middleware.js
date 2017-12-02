module.exports = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }

    let {status, message} = err;

    res
        .status(status)
        .send(message)
        .end();
};