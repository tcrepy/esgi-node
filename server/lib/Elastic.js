const { Client } = require('@elastic/elasticsearch');
const ELKClient = new Client({ node: 'http://localhost:9201' });
module.export = ELKClient;