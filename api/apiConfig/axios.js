const axios = require('axios');

module.exports = axios.create({
  baseURL: 'api:4000'
});
