const pg = require("pg");
const actordb = require("./actordb");
const settings = require("./settings"); // settings.json

var knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

knex.select().from('famous_people')
  .where({first_name: process.argv[2]})
  .then(rows => {
    rows.forEach((row ,i) => console.log(`${i+1}-${row.first_name} ${row.last_name}, born '${row.birthdate}'`))
    knex.destroy();
  })
  .catch(function(error) {
    console.error(error)
    knex.destroy();
});



