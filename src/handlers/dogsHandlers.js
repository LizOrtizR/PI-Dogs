
const { createDog,getDogById,searchDogByName,getAllDogs } = require("../controllers/dogsControllers"); 

const getDogsHandler= async (req,res)=>{
  const {name} = req.query; 
  
const results = name ? await searchDogByName(name):await getAllDogs()
try {
  res.status(200).json (results)
} catch (error) {
  res.status(400).json({error: "el usuario no existe"});
}

};



const getDogsHandlerById =async(req, res)=>{
  const{idRaza} = req.params; 
  const source = isNaN(idRaza)? "db": "api"; //si lo que tengo es NaN sig que es un uuid si no va a la api 
  try {
    const dog =  await getDogById(idRaza, source); //indico a donde va a buscarlo  
    res.status(200).json(dog); 
  } catch (error) {
    res.status(400).json({error: "el id no existe"}); 
    
  }
  
};

const getDogsHandlerByName =(req, res)=>{
  res.send
};


const createDogsHandler = async (req, res)=>{ //no pasar propiedad de la req al control- handler 
  const { name, weight, height, life_span, temperament, image } = req.body;
  
  try {  
    const newDog = await createDog(name, weight, height, life_span, temperament, image); 
    res.status(201).json(newDog); 
  
  } catch (error) {
    res.status(400).json({error: error.message}); 
  }
  
};

module.exports={
  getDogsHandler, getDogsHandlerById, getDogsHandlerByName, createDogsHandler
}