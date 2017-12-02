const uuid = require('uuid-lib');
const Performance = require('performance-node');
const logger = require('../utils/logger');

const timeline = new Performance();

module.exports = (req, res, next) => {
    let reqUuid = uuid.raw();
    let reqStartLabel = `${reqUuid} start`;
    let reqEndLabel = `${reqUuid} end`;

    timeline.mark(reqStartLabel);

    logger.info(`${req.method} ${req.originalUrl} requested (${reqUuid})`);

    res.on('finish', () => {
        timeline.mark(reqEndLabel);
        timeline.measure(reqUuid, reqStartLabel, reqEndLabel);

        let reqMeasures = timeline.getEntriesByName(reqUuid)[0];

        logger.info(`request ${reqUuid} ended (${reqMeasures.duration})`);
    });

    next();
};