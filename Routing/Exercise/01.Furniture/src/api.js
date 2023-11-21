import { userData } from "./user-data-helper.js";

const host = 'http://localhost:3030/';

async function requester(method, url, data){
    const option = {
        method,
        headers: {},

    }

    if (data) {
        option.headers ['Content-Type'] = 'application/json';
        option.body = JSON.stringify(data);
    }

    const userInfo = userData.getUserData();
    
    if (userInfo) {
        option.headers['X-Authorization'] = userInfo.accessToken; 
    }

    try {
        const response = await fetch(host + url, option);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status === 204) {
            return response;
        }

        return await response.json();

    } catch (error) {
        alert(error.message);
        throw error;
    }
}

export function get(url) {
    return requester('get', url);
}

export function post(url, data){
    return requester('post', url, data);
}

export function put(url, data){
    return requester('put', url, data)
}

export function del(url){
    return requester('delete', url);
}