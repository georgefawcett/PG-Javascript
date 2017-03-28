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


function addPerson (firstName, lastName, birthDate) {
  knex.insert([
    { first_name: firstName,
      last_name: lastName,
      birthdate: birthDate
    }]).into('famous_people')

  .asCallback(function(err, rows) {
    if (err) return console.error(err);
    console.log(rows);
    knex.destroy();
  });
}

addPerson(process.argv[2], process.argv[3], process.argv[4]);
