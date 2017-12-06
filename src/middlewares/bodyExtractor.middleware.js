const extractProps = require('../utils/extractProps');

module.exports = (destination, props) => (req, res, next) => {
    req[destination] = extractProps(req.body.data, props);

    next();
};