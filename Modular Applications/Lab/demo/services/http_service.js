export async function get(url){
    return await fetch(url, {
        method: 'get',
    })
    .then((res) => 
     res.json());
}

export async function post(url, body, authToken){
    const headers = {
        'Content-Type': 'application/json'
    }
    
    if (authToken) {
        headers['X-Authorization'] = authToken
    }

    return await fetch(url, {
        method: 'post',
        headers,
        body: JSON.stringify(body)
    }).then((res) => res.json())
      .then((data) => {
        if (data.code && data.code !== 200) {
            throw new Error(data.message)
        }

        return data;
      })
}