//scripts/devConfig.js
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
const configFactory = require('../config/webpack.config');

// Generate configuration
module.exports = () => configFactory('development');
