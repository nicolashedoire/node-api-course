/*
* Create and export configuration variables
*
*/

// Container for all the environments
let environments = {};


// Staging (default) environment
environments.staging = {
    'port': 4500,
    'mode': 'staging',
}

// Production environment
environments.production = {
    'port': 5000,
    'mode': 'production',
}

// Determine which environment was passed as a command-line argument
const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : null;

const currentEnvironmentToExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.staging;

module.exports = currentEnvironmentToExport;