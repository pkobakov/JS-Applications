function loadRepos() {
    const repos = document.getElementById('repos');
    const username = document.getElementById('username').value;
    const url = `https://api.github.com/users/${username}/repos`;

    const response = fetch(url);

    response.then(res => {

        if (res.ok === false) {
            console.log('Error encountered', res.status, 'Not Found');
			return Promise.reject(`${res.status}: Not Found`);
            
       
        } else{
            
            return res.json();
        }
    }).then(data => {
		repos.replaceChildren();
		 
        for (const entry of data) {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${entry.htm_url}" >${entry.full_name}</a>`;

            repos.appendChild(li);
        }
    }).catch(error => {
		repos.innerHTML = `<p>${error}</p>`;
	})
}