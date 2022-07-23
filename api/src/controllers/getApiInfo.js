//traer api
const axios = require('axios');


const getApiInfo = async () => {

    let apiLink = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40');
    let array = apiLink.data.results; //trae la data del array results

    let pokemonArray = await Promise.all(array.map(async (typeOfPokemon) => { 
        let body = await axios.get(typeOfPokemon.url); // el promise va interpretando linea a linea. SE POSICIONA EN ESTE CASO -- EN LA URL
        let pokemon = body.data;
        let typeMap = pokemon.types.map(typeOfPokemon =>{
            return typeOfPokemon.type.name;
        });
        return {
            id: pokemon.id,
            name: pokemon.name,
            life:  pokemon.stats[0].base_stat,
            attack:  pokemon.stats[1].base_stat,
            defense:  pokemon.stats[2].base_stat,
            speed:  pokemon.stats[5].base_stat,
            height:  pokemon.height,
            weight:   pokemon.weight,
            img: pokemon.sprites.other['official-artwork'].front_default,
            types:  typeMap
        }    
    }))
    //console.log(pokemonArray)
    return pokemonArray                 
}


module.exports = {getApiInfo} 

// id: p.url.id,
// name: p.name,
// //life: p.stats[0].base_stat,
// attack: p.attack,
// defense: p.defense,
// speed: p.speed,
// height: p.height,
// weight: p.weight,
// image: p.image,
 //types: p.types.map((t) => t.type.name),
 //abilities: p.abilities.map((a) => a.ability.name)