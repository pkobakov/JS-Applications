document.getElementById('load-data-btn').addEventListener('click', loadData);
document.getElementById('register-form').addEventListener('submit', onRegister);

async function loadData(){
    const url = 'http://localhost:3030/data/recipes';

    const options = {
        method: 'get',
        headers: {
            'X-Authorization': '4674877e475784cd64da22eaa18f9d049e7cd06014cbee62ebb33375b05f69f3'
        }
    };

    try {
        const response = await fetch(url, options);

        if (response.ok == false) {
            const error = response.json();
            throw error;
        }
        const data = await response.json();
        
        console.log(data);
    } catch (error) {
        
    }


}

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
        console.log(userData.accessToken);

    } catch (error) {
        alert(error.message);
    }
}