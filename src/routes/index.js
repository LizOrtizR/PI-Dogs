const { Router } = require('express');
const dogsRouter = require('./dogsRouter'); 
const tempRouter = require ('./tempRouter'); 


const  mainRouter = Router(); 
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const { api_key }  = process.env
// const URL = `https://api.thedogapi.com/v1/breeds?${api_key}`;
mainRouter.use('/dogs', dogsRouter); 
mainRouter.use('/temperaments', tempRouter);



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// router.get("/dogs", async (req, res )=>{

//     try {
//         const dogsApi = await axios.get('https://api.thedogapi.com/v1/breeds', {
//             headers:{
//                 'x-api-key':api_key
//             }
//         });
//         const breeds = Object.keys(response.data.message);
//         const dogBreeds = breeds.map(breed => ({ breed }));
//         res.send({ dogs: dogBreeds });
//       } catch (error) {
//         console.error(error);
//         res.status(500).send({ message: 'Error retrieving dog breeds' });
//       }
//     });

    //////////////////////////////////////////////////
    
module.exports = mainRouter;
