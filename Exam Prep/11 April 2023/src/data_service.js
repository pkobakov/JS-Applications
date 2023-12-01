import {api} from './api.js';

const dataEndpoints = {
    getAllEvents: 'data/events?sortBy=_createdOn%20desc',
    getEvent: 'data/events/'
}

async function getAllEvents(){
    return api.get(dataEndpoints.getAllEvents);
}

async function createEvent (data){
    return api.post(dataEndpoints.getEvent, data);
}

async function getSingleEvent(id){
    return api.get(dataEndpoints.getEvent + id);
}

async function updateEvent(id, data){
    return api.put(dataEndpoints.getEvent + id, data)
}

async function deleteEvent(id){
    return api.del(dataEndpoints.getEvent + id);
}

export const dataService = {
   getAllEvents,
   createEvent,
   getSingleEvent,
   updateEvent,
   deleteEvent
}