const {DataTypes} = require("sequelize");

//exporto una arrow function
module.exports = (sequelize) => {
    sequelize.define('TipoDePokemon', { //abstraccion que representa una table en nuestra base de datos

        id:{
            type: DataTypes.INTEGER, // para que se repita un ID crea otro ID alfanumerico para que no se pisen
           // autoIncrement: true, // para incrementar el id
          //  defaultValue:DataTypes.UUIDV4,
            allowNull: false, // obligatorio
            primaryKey: true//la necesitare??? ver
          },
          name:{
            type: DataTypes.STRING,
            allowNull: false,
          },

});
};