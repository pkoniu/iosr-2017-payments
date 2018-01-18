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
            ORDERS_SERVICE_URL: 'http://iosr2017orders-staging.herokuapp.com',
            MENU_SERVICE_URL: 'http://iosr2017menu-staging.herokuapp.com',
            STORAGE_SERVICE_URL: 'http://iosr2017storage-staging.herokuapp.com',
            CLOUDAMQP_URL: 'amqp://grponzdp:pwcTF2Rql4tGh3SyssbVOxe2Ih6jTFJb@gopher.rmq.cloudamqp.com/grponzdp'
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
            ORDERS_SERVICE_URL: 'http://iosr2017orders-production.herokuapp.com',
            MENU_SERVICE_URL: 'http://iosr2017menu-production.herokuapp.com',
            STORAGE_SERVICE_URL: 'http://iosr2017storage-production.herokuapp.com',
            CLOUDAMQP_URL: 'amqp://grponzdp:pwcTF2Rql4tGh3SyssbVOxe2Ih6jTFJb@gopher.rmq.cloudamqp.com/grponzdp'
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