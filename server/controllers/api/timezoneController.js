import knex from '../../database/knex.js';

const getTimezones = (req, res) => {
  knex.pluck('name')
    .from('pg_timezone_names')
    .catch((error) => {
      console.log('Query error');
    }).then((timezones) => {
      return res.json(timezones);
    })
    .catch((error) => {
      console.log('Error on data');
    });
}

export {
  getTimezones,
}