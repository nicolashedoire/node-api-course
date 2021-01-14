/*
* Create and export configuration variables
*
*/

// Container for all the environments
let environments = {};


// Staging (default) environment
environments.staging = {
    'httpPort': 4500,
    'httpsPort': 4501,
    'mode': 'staging',
    'secret': 'poiuyttreaqsdfghjklmnvcxw?./'
}

// Production environment
environments.production = {
    'httpPort': 5000,
    'httpsPort': 5001,
    'mode': 'production',
    'secret': 'poiuytcdcibdsifudisuhjklmnvcxw?./'
}

// Determine which environment was passed as a command-line argument
const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : null;

const currentEnvironmentToExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.staging;

module.exports = currentEnvironmentToExport;