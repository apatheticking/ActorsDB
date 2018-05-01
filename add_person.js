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

knex('famous_people')
.insert([{first_name: process.argv[2], last_name: process.argv[3],  birthdate: process.argv[4]}])
.then(() => {
  console.log("inserted to database");
  knex.destroy();
  })
.catch(function(error) {
    console.error(error)
    knex.destroy();
});