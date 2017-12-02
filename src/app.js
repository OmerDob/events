const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');

const requestLogger = require('./middlewares/requestLogger.middleware');
const healthCheck = require('./middlewares/healthCheck.middleware');
const errorHandler = require('./middlewares/errorHandler.middleware');

const loadModels = require('./loadModels');
const loadRouters = require('./loadRouters');
const initDb = require('./initDb');

const app = express();

app.use(bodyParser.json({extended: true}));
app.use(requestLogger);

loadModels();
loadRouters(app);

app.get('/health', healthCheck);

app.use(errorHandler);

const onAppStart = () => logger.info(`Service is running on port ${process.env.PORT}`);

initDb().then(() => app.listen(process.env.PORT, onAppStart));