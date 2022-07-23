//info base de datos

const {Pokemon, tipoDePokemon} = require('../db')

const getDbInfo = async () =>{
    return await Pokemon.findAll({
include:{
    model: tipoDePokemon,
    attributes: ['tipoDePokemon'],
    throught:{
        attributes:['name']
    }
}

})

}

module.exports= {getDbInfo}