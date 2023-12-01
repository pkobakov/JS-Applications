import { userHelper } from './user_helper.js';

const base_url = 'http://localhost:3030/';

async function requester(url, method, data){
    const option = {
        method,
        headers: {}
    }


    const userdata = userHelper.getUserData();
    
    if(userdata){
       option.headers['X-Authorization'] = userdata.accessToken;
    }

    if (data) {
        option.headers['Content-Type'] = 'application/json';
        option.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(base_url + url, option)

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status === 204) {
            return response;
        }

        return response.json();
    } catch (error) {
        throw error
    }
}

async function get(url){
    return await requester(url, 'get');
}

async function post(url, data){
    return await requester(url, 'post', data);
}

async function put(url, data){
    return await requester(url, 'put', data);
}

async function del(url){
    return await requester(url, 'delete');
}

export const api = {
    get,
    post, 
    put,
    del
}

