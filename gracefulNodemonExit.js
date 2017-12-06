const mongoose = require('mongoose');

process.once('SIGUSR2', () => {
    mongoose.connection
        .close()
        .then(() => process.kill(process.pid, 'SIGUSR2'));
});