const {
    HEROKU_APP_NAME = 'iosr2017payments'
} = process.env;

module.exports = {
    staging: {
        acm: false,
        name: `${HEROKU_APP_NAME}-staging`,
        region: 'eu',
        maintenance: false,
        stack: 'heroku-16',
        config_vars: {
            NODE_ENV: 'staging',
            ORDERS_SERVICE_URL: 'iosr2017orders-staging.herokuapp.com',
            MENU_SERVICE_URL: 'iosr2017menu-staging.herokuapp.com',
            STORAGE_SERVICE_URL: 'iosr2017storage-staging.herokuapp.com'
        },
        addons: {
            librato: {
                plan: 'librato:development'
            },
            logentries: {
                plan: 'logentries:le_tryit'
            },
            mongolab: {
                plan: 'mongolab:sandbox'
            }
        },
        collaborators: [
            'patryk.konior@gmail.com',
            'stawickipiotr94@gmail.com'
        ]
    },
    production: {
        acm: false,
        name: `${HEROKU_APP_NAME}-production`,
        region: 'eu',
        maintenance: false,
        stack: 'heroku-16',
        config_vars: {
            NODE_ENV: 'production',
            ORDERS_SERVICE_URL: 'iosr2017orders-production.herokuapp.com',
            MENU_SERVICE_URL: 'iosr2017menu-production.herokuapp.com',
            STORAGE_SERVICE_URL: 'iosr2017storage-production.herokuapp.com'
        },
        addons: {
            librato: {
                plan: 'librato:development'
            },
            logentries: {
                plan: 'logentries:le_tryit'
            },
            mongolab: {
                plan: 'mongolab:sandbox'
            }
        },
        collaborators: [
            'patryk.konior@gmail.com',
            'stawickipiotr94@gmail.com'
        ]
    }
};