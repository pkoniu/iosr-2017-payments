const {
    HEROKU_APP_NAME = 'iosr2017payments'
} = process.env;

module.exports = {
    name: 'iosr2017-payments-pipeline',
    apps: {
        staging: `${HEROKU_APP_NAME}-staging`,
        production: `${HEROKU_APP_NAME}-production`
    }
};