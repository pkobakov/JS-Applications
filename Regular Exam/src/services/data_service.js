import { api } from "./api.js";

const dataEndoints = {
    getAllCharacters: 'data/characters?sortBy=_createdOn%20desc',
    postCharacter: 'data/characters',
    getSingleCharacter: 'data/characters/'
}

async function getAllCharacters(){
    return api.get(dataEndoints.getAllCharacters);
}

async function addCharacter(data){
    return api.post(dataEndoints.postCharacter, data);
}

async function getSingleCharacter(id){
    return api.get(dataEndoints.getSingleCharacter + id);
}

async function updateCharacter(id, data){
    return api.put(dataEndoints.getSingleCharacter + id, data);
}

async function deleteCharacter(id){
    return api.del(dataEndoints.getSingleCharacter + id);
}



export const dataService = {
   getAllCharacters,
   addCharacter,
   getSingleCharacter,
   updateCharacter,
   deleteCharacter
}