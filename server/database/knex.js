import { environment } from '../config.js';
const config = require('../../knexfile.js')[environment];
const knex = require('knex')(config);

export default knex;