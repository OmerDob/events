const uuid = require('uuid-lib');
const Performance = require('performance-node');

const timeline = new Performance();

module.exports = (req, res, next) => {
    let reqUuid = uuid.raw();
    let reqStartLabel = `${reqUuid} start`;
    let reqEndLabel = `${reqUuid} end`;

    timeline.mark(reqStartLabel);

    console.log(`${timeline.now()} - ${req.method} ${req.originalUrl} requested (${reqUuid})`);

    res.on('finish', () => {
        timeline.mark(reqEndLabel);
        timeline.measure(reqUuid, reqStartLabel, reqEndLabel);

        let reqMeasures = timeline.getEntriesByName(reqUuid)[0];

        console.log(`${timeline.now()} - request ${reqUuid} ended (${reqMeasures.duration})`);
    });

    next();
};