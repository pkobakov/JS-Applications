import {api} from './api.js';

const dataEndpoints = {
    getMusicLibrary: 'data/albums?sortBy=_createdOn%20desc',
    getAlbum: 'data/albums/'
}

async function getMusicLibrary(){
    return api.get(dataEndpoints.getMusicLibrary);
}

async function addNewAlbum(data){
    return api.post(dataEndpoints.getAlbum, data);
}

async function getSingleAlbum(id) {
    return api.get(dataEndpoints.getAlbum + id);
}

async function updateAlbum(id, data){
    return api.put(dataEndpoints.getAlbum + id, data)
}

async function deleteAlbum(id){
    return api.del(dataEndpoints.getAlbum + id);
}

export const dataService = {
    getMusicLibrary,
    addNewAlbum,
    getSingleAlbum, 
    updateAlbum,
    deleteAlbum
}