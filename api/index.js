// - Index del buda---LEVANTA EL SERVIDOR

const {getAllPokemons} = require('./src/controllers/getAllPokemons');
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
//const { getApiInfo } = require('./src/controllers/getApiInfo');

// Syncing all the models at once.


// Puedes ir cambiándolo según necesites.
conn.sync({ force: false}).then(() => { // PROMESA---+ { force:true }:
// > Básicamente gestiona el almacenamiento viene con una sentencia “Force” y puede tener 2 valores.
// 1- false : Mantiene almacenada la información de la base de datos de manera continua
// 2- true: Cada vez que inicies todos los datos se verán reiniciados

  server.listen(3001, () => {
  console.log('%s listening at 3001'); // eslint-disable-line no-console
     
  // getApiInfo();

  });
});


