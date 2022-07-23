const {getApiInfo} = require('./getApiInfo') //api consume
const {getDbInfo} = require('./getDbInfo') //db-base de datos

const getAllPokemons = async() =>{
    //info que nos traemos desde la api
const apiInfo = await getApiInfo();

//PARA LOS TYPES DE POKEMONES 
const dbInfo = await getDbInfo();

let pokeMapeo = dbInfo.map(pokeMaps=>{
    return {
        id: pokeMaps.id,
        name: pokeMaps.nombre,
        life: pokeMaps.life,
        attack : pokeMaps.attack,
        defense : pokeMaps.defense,
        speed : pokeMaps.speed,
        height : pokeMaps.height,
        weight : pokeMaps.weight,
        img: pokeMaps.sprites.other['official-artwork'].front_default,
        types : pokeMaps.types.map(pokeType=> pokeType.type.name)
    }
})
const info = apiInfo.concat(pokeMapeo);

return apiInfo;
}



module.exports = {getAllPokemons}