const { Dog } = require('../db'); 
const axios = require("axios"); 




const cleanArray = (arr)=>     //modularizando el mapeo
   arr.map((elem)=>{
        return {
            id:elem.id,
            name:elem.name,
            weight: elem.weight,
            height: elem.height,
            life_span: elem.life_span,
            temperament: elem.temperament,
            image: elem.image,
            created: false,
        };
    });


const createDog= async (name, weight, height, life_span, temperament, image)=>{  //manejo promesas

  await Dog.create({name, weight, height, life_span, temperament, image})
}


const getDogById = async (idRaza, source)=>{
    const dog = 
    source === "api"
    ? (await axios.get(`https://api.thedogapi.com/v1/breeds/${idRaza}`))
    .data
    : await Dog.findByPk(idRaza); //{ include: Temperament }
  return dog; 
  
  }; 

  const getAllDogs= async ()=>{     //data cruda 
    const dataBaseDogs = await Dog.findAll(); 
     
    const apiDogsRaw= (
        await axios.get("https://api.thedogapi.com/v1/breeds")
    ).data; 

    const  apiDogs = cleanArray(apiDogsRaw)
    return [...dataBaseDogs, ...apiDogs]; //array nuevo
    res.json(dogs)
  };




  const searchDogByName= async (name)=>{ 

    const dataBaseDogs = await Dog.findAll({
        
     where: {name}
    });

    const  apiKey = process.env.API_KEY;
    const apiUrl = `https://api.thedogapi.com/v1/breeds/search?q=${name}`; 
    const headers = {' x-api-key': process.env.API_KEY}; 

  const apiDogsRaw = await axios.get(apiUrl,{ headers });
const apiDogs = apiDogsRaw.data.map((elem)=>({
    id:elem.id,
    name:elem.name,
    weight: elem.weight,
    height: elem.height,
    life_span: elem.life_span,
    temperament: elem.temperament,
    image: elem.image,
    created: false,
 

}));



    return [...dataBaseDogs, ...apiDogs];
   
    
  };



// const searchDogByName =async(name)=>{
//     const dataBaseDogs =await Dog.findAll({where: { name: name }}); 
//     const apiDogsRaw = (
//         await axios.get("https://api.thedogapi.com/v1/breeds")).data;
      
        
//     const apiDogs = cleanArray(apiDogsRaw); 

//     const filteredApi =apiDogs.filter((dog)=> dog.name === name); 
//     return [...filteredApi, ...dataBaseDogs];
// };


 
module.exports={ createDog, getDogById, searchDogByName, getAllDogs }