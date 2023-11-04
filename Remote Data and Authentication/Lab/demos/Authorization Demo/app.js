//let token;
document.getElementById('register-form').addEventListener('submit', onRegister);
document.getElementById('login-form').addEventListener('submit', onLogin);
document.getElementById('load-data-btn').addEventListener('click', loadData);

const recipes = document.querySelector('#recipes-list');


async function onRegister(event){
    event.preventDefault();
    const formData = new FormData(event.target)
    
    const {email, password, confirm} = Object.fromEntries(formData);
    
    if (email == '' || password == '') {
        return alert('This fields are required');
    }
    
    if(password != confirm){
        return alert('Passwords should be equal!')
    }
    
    const url ='http://localhost:3030/users/register';
    const options ={
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email,password})
    }
    
    try {
        const result = await fetch(url, options);
        
        if (result.ok == false) {
            const error = await result.json();
            throw error;
        }
        const userData = await result.json();
        //token = userData.accessToken;
        localStorage.setItem('accessToken', userData.accessToken); 
        
        console.log(localStorage);
        console.log(userData.accessToken);
        
    } catch (error) {
        alert(error.message);
    }
}

async function onLogin(event){
   event.preventDefault();
   const formData = new FormData(event.target);

   const{email, password} = Object.fromEntries(formData.entries());
   const url = 'http://localhost:3030/users/login';

   const options = {
    method: 'post',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify({email, password})    
    };

    try {
        const response = await fetch(url, options)

        if (response.ok == false) {
            const error = await response.json();
            throw error;
        }
       const userData = await response.json()
       localStorage.setItem('accessToken', userData.accessToken);

       console.log(localStorage);

    } catch (error) {
        alert(error.message);
    }
}

async function loadData(){
    const token = localStorage.getItem('accessToken');
    
    if (token == null) {
        return alert('You are not logged in!')
    }
    
    const url = 'http://localhost:3030/data/recipes';
    const options = {
        method: 'get',
        headers: {
            'X-Authorization': token
        }
    };

    try {
        const response = await fetch(url, options);

        if (response.ok == false) {
            const error = response.json();
            throw error;
        }
        const data = await response.json();

        Object.entries(data).map(entry => {

            const listItem = document.createElement('li');
            listItem.textContent  = entry[1].name;
            recipes.appendChild(listItem);
        }); 

        console.log(data);

    } catch (error) {
        
    }


}
