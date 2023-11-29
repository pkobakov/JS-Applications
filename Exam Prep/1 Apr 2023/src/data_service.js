import { api } from "./api.js"

const dataEndpoints = {
    getAllFruits: 'data/fruits?sortBy=_createdOn%20desc',
    getSingleFruit: 'data/fruits/',
}

async function getAllFruits(){
    return api.get(dataEndpoints.getAllFruits)
}

async function getFruit(id){
    return api.get(dataEndpoints.getSingleFruit + id)
}

async function createFruit (data){
    return api.post(dataEndpoints.getSingleFruit, data);
}

async function updateFruit(id, data){
    return api.put(dataEndpoints.getSingleFruit + id, data);
}

async function deleteFruit(id){
    return api.del(dataEndpoints.getSingleFruit + id)
}

export const dataService = {
    getAllFruits, 
    getFruit, 
    createFruit,
    updateFruit,
    deleteFruit 
}