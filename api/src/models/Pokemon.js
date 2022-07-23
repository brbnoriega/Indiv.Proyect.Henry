const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => { // sequelize es una libreria super opinionada.  lo que no le diga lo presupone
  // defino el modelo
  sequelize.define('Pokemon', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id:{ // si no le paso id presupone que es un integer
      type: DataTypes.UUID, // para que se repita un ID crea otro ID alfanumerico para que no se pisen
      defaultValue: DataTypes.UUIDV4, // id que se separa en grupos de 4 los caracteres
      allowNull: false, // obligatorio
      primaryKey: true//llave de busqueda
    },

    life:{
      type: DataTypes.INTEGER, //VER QUE SEA UN NUMERO
      allowNull: false // obligatorio
    },

    attack:{
      type: DataTypes.INTEGER, //VER QUE SEA UN NUMERO
      allowNull: false // obligatorio
    },

    defense:{
      type: DataTypes.INTEGER, //VER QUE SEA UN NUMERO
      allowNull: false // obligatorio
    },

    speed:{
      type: DataTypes.FLOAT, //VER QUE SEA UN NUMERO
      allowNull: false // obligatorio
    },

   height:{
      type: DataTypes.FLOAT, //VER QUE SEA UN NUMERO
      allowNull: false // obligatorio
    },

    weight:{
      type: DataTypes.FLOAT, //VER QUE SEA UN NUMERO
      allowNull: false // obligatorio
    },
    img: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
};

// ] Pokemon con las siguientes propiedades:
// ID (Número de Pokemon) * : No puede ser un ID de un pokemon ya existente en la API pokeapi
// Nombre *
// Vida
// Ataque
// Defensa
// Velocidad
// Altura
// Peso