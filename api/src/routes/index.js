const { Router } = require('express');
const axios = require('axios')
// // Importar todos los routers;
// // Ejemplo: const authRouter = require('./auth.js');

const {Pokemon, TipoDePokemon} = require('../db')

// require("dotenv").config()
const {getApiInfo} = require ('../controllers/getApiInfo')
const {getAllPokemons} = require ('../controllers/getAllPokemons');
const { urlencoded } = require('body-parser');
 const router = Router();


//----------CARGANDO DB------------------------------------------------------------------------------------------

const pokeDB = async()=>{

    const full = await TipoDePokemon.count();
    if(!full){
    const respuesta = await axios.get('https://pokeapi.co/api/v2/type');
    const typeInfo = await Promise.all(respuesta.data.results.map(async(typeMap)=>{
       const findId = await axios.get(typeMap.url)
        return{
        id: findId.data.id,
        name:typeMap.name
    }}));

    let pokeApi = await axios.get('https://pokeapi.co/api/v2/type');

    let resultArray = pokeApi.data.results; //trae la data del array results
   

    const typesFromDB = await TipoDePokemon.findAll()
    if(typesFromDB.length === 0){
        await TipoDePokemon.bulkCreate(typeInfo);
        return TipoDePokemon;
    }
}
}

//-----------------------------------------------------------------------------------------------------------------------

// // Configurar los routers
// // Ejemplo: router.use('/auth', authRouter);

//------------------------------------- []GET /pokemons--------------------------------------------------------------
router.get('/pokemons', async (req, res) => {
   
    try{
  
// Obtener un listado de los pokemons desde pokeapi.

    let pokeApiInfo = await getApiInfo() // me traigo todos los pokemons de la api 
   
    res.status(200).send(pokeApiInfo) 

    }catch(error){ 
    res.send('Not pokeFound 404')
}

})
//-------------------------------------------------------------------------------------------------------
//     let allPokemons = await getAllPokemons() // me traigo todos los pokemons de la api 
    
//     if(name){ // si el usuario busca por name del pokemon       
       
//                             //paso todos los poke a minuscula             //paso a minusc lo que el usuario haya escrito             
//     let pokeName = await allPokemons.filter(filterN=>filterN.name.includes(name.toLocaleLowerCase())); // para que encuentre el pokemon por mas que el usuario escriba mayusc

//         pokeName.length ?   // si hay algo en el pokename
//         res.status(200).send(pokeName) :  // si hay match devuelve el match  y sino (:)
//         res.send([{
//             name: 'The Pokemon you want dont existe, but you could create'  // devuelve un mens para el extra del CREATE POKEMON 
//         }])

//    }else{
//     console.log(allPokemons)
//     return res.status(200).send(allPokemons) //si no hay name devuelvo todos los pokemones
// }
//     }catch(error){ // si no devuelve nada tira error del catch error que ya esta programado en el app
//     next(error);
// }
//});

//------------------------------------- GET /types:------------------------------------------------------
//Obtener todos los tipos de pokemons posibles
//En una primera instancia deberán traerlos desde pokeapi y guardarlos en su propia base de datos y luego ya utilizarlos desde allí

router.get('/types', async (req,res)=>{
const pokeDbKepp = pokeDB();
   
   res.send(pokeDbKepp);

    })


//-------------------------------------  GET /pokemons/{idPokemon}:--------------------------------------------

// Debe traer solo los datos pedidos en la ruta de detalle de pokemon
// Tiene que funcionar tanto para id de un pokemon existente en pokeapi o uno creado por ustedes

 router.get('/pokemons/:id', async (req, res) => {
    const {id}= req.params;
//-------------busqueda de id en DB----CORRE CUANDO LE PASO EL ID QUE YA TENGO EN MI DB CREADO (POKE NEW CREADO)
   if(id.length > 10){
    try{
        const full = await Pokemon.count(); // 1
    if(full){
    const findIdPokeCreate = await Pokemon.findOne({
        where: {id: id}
    })
    res.send(findIdPokeCreate);
}
   }catch(error){
         res.send('Sorry! I dont have that Id in my DataPoke')
    }
   
    
   } 
//-----------------------//busqueda de id en endpoint api// ---------------------------------------------------------------  
if(id.length <= 10){ 
try{

    let idApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    let idArray = idApi.data; //trae la data 
   
    let infoPokeId = {
            id: idArray.id,
            name: idArray.name,
            life: idArray.stats[0].base_stat,
            attack: idArray.stats[1].base_stat,
            defense: idArray.stats[2].base_stat,
            speed: idArray.stats[5].base_stat,
            height: idArray.height,
            weight: idArray.weight,
            img: idArray.sprites.other['official-artwork'].front_default,
            types: idArray.types.map(pokeType=> pokeType.type.name)
        }
    
        res.send(infoPokeId);
        return infoPokeId; 
}catch(error){
    res.status(404).send("Not catch a pokebola so I didnt found ur pokemon");
}
}    

})


//---------------------------------------------ID QUE ESTA FUNCIONANDO SIN LOS POKEMOINES CREADOS---------------------------------------------------------------------------------------------------------------
//     let idApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
//     try{
//     let idArray = idApi.data; //trae la data 

//     let infoPokeId = {
//                 id: idArray.id,
//                 name: idArray.name,
//                 life: idArray.stats[0].base_stat,
//                 attack: idArray.stats[1].base_stat,
//                 defense: idArray.stats[2].base_stat,
//                 speed: idArray.stats[5].base_stat,
//                 height: idArray.height,
//                 weight: idArray.weight,
//                 type: [idArray.types[0].type.name, idArray.types[1].type.name]
// }
//     res.send(infoPokeId);
//     return infoPokeId;

//     }catch(error){
//     return res.status(404).send("Not catch a pokebola so I didnt found ur pokemon");
// }
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//})

//------------------------------------------ GET /pokemons?name="...":-----------------------------------------
// Obtener el pokemon que coincida exactamente con el nombre pasado como query parameter 
//(Puede ser de pokeapi o creado por nosotros)
// Si no existe ningún pokemon mostrar un mensaje adecuado

router.get('/:name', async(req,res)=>{ 
   const {name} = req.params;
    //const name = req.query.name;
    try {
        let pokeInDb = await Pokemon.findOne({
            where: {name:name}, 
        });

        if(pokeInDb){
            let pokemonOfDb = {
                id: pokeInDb.id,
                name: pokeInDb.name,
                life: pokeInDb.life,
                attack: pokeInDb.attack,
                defense: pokeInDb.defense,
                speed: pokeInDb.speed,
                height: pokeInDb.height,
                weight: pokeInDb.weight,
                img: pokeInDb.img
               // types: pokeInDb.type
            }
            res.send(pokemonOfDb);
        } else{
            let searchPokeInApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
            let findPokemon = searchPokeInApi.data;

            let infoPokeApi = {
                id: findPokemon.id,
                name: findPokemon.name,
                life: findPokemon.stats[0].base_stat,
                attack: findPokemon.stats[1].base_stat,
                defense: findPokemon.stats[2].base_stat,
                speed: findPokemon.stats[5].base_stat,
                height: findPokemon.height,
                weight: findPokemon.weight,
                img: findPokemon.sprites.other['official-artwork'].front_default,
                types: findPokemon.types.map(pokeType=> pokeType.type.name)
            }
            res.send(infoPokeApi)
        }
    } catch (error) {
      res.send('404 PokeName Not found! Try in another gyms :)')
    }
})    


//--------------------------- query apiPokemonName FUNCIONA---------------------------------------------------------------------    
//  const {name} = req.params;
    //const name = req.query.name;

//     let pokeApiName = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

//     try{
    
//     let nameArray = pokeApiName.data; 
//     let nameRes = {
//                 id: nameArray.id,
//                 name: nameArray.name,
//                 life: nameArray.stats[0].base_stat,
//                 attack: nameArray.stats[1].base_stat,
//                 defense: nameArray.stats[2].base_stat,
//                 speed: nameArray.stats[5].base_stat,
//                 height: nameArray.height,
//                 weight: nameArray.weight,
//                 type: nameArray.types.map(pokeType=> pokeType.type.name)
// }
//     res.send(nameRes);

//     }catch(error){
//     return res.status(404).send("I dont Know that pokeName");
// }
// })

//-----------------------------------------------------------[] POST /pokemons:-------------------------------------------
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de pokemons por body
// Crea un pokemon en la base de datos relacionado con sus tipos.

router.post('/pokemons', async(req,res)=>{
    const { name, life, attack, defense, speed, height, weight, img, types} = req.body;
   
    if(!name || !life || !attack || !defense || !speed || !height || !weight || !img || !types)
    return res.status(404).send('Professor Oak isnt happy because ur Pokemon cant be create 1ero');
  try{
    const pokemonCreate = await Pokemon.create({
        name: name,
        life: life,
        attack: attack,
        defense: defense,
        speed: speed,
        height: height,
        weight: weight,
        img: img
     // no me traeria types porque esta en db y de ahi tengo que traerla creo!
});  
    // me traigo type de la base de datos O.O
    let typeDb = await TipoDePokemon.findAll({
        where: {
            name: types //f12
        }
    });
    pokemonCreate.addTipoDePokemon(typeDb);
   
    res.status(201).send('We have our PokeNew :)');
    //res.send(typeDb)
  }catch(error){
    res.status(404).send('Professor Oak isnt happy because ur Pokemon cant be create');
  }

})



module.exports = router;


