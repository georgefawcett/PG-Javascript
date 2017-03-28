const pg = require("pg");
const settings = require("./settings"); // settings.json

const knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});


function findName (name) {
  knex.select().from('famous_people')
  .where('first_name', 'like', '%'+name+'%')
  .orWhere('last_name', 'like', '%'+name+'%')
  .asCallback(function(err, rows) {
    if (err) return console.error(err);
    console.log(rows);
    knex.destroy();
  });
}

findName(process.argv[2]);


