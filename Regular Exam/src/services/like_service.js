import { api } from './api.js';

const likesEndpoints = {
   getLikes: 'data/useful'
}

async function posLike(id){
    return await api.post(likesEndpoints.getLikes, id);
}

async function getLikesCount(id){
    const query = `?where=characterId%3D%22${id}%22&distinct=_ownerId&count`;
    return await api.get(likesEndpoints.getLikes + query);
}

async function getLikesbyIdAndUserId(characterId, userId){
    const query = `?where=characterId%3D%22${characterId}%22%20and%20_ownerId%3D%22${userId}%22&count`;
    return await api.get(likesEndpoints.getLikes + query);
}

export const likesService = {
    posLike,
    getLikesCount,
    getLikesbyIdAndUserId
}