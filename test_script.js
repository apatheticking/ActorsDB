const pg = require("pg");
const actordb = require("./actordb");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  actordb.findActor(client, process.argv[2], (err, result) => {
    var count = 1;
    console.log(`Found ${result.length} person(s) by the name of '${process.argv[2]}'`);
    for(let row of result){
      console.log(`-${count}: ${row.first_name} ${row.last_name}, born '${row.birthdate}'`);
      count++;
    }
    client.end();
  })

});