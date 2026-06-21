/** @type {import('jest').Config} */
const config = {
    verbose: true,
    reporters: ['default', ['@testomatio/reporter/jest', { apiKey: process.env.TESTOMATIO }]],
};

module.exports = config;
require('dotenv').config();
