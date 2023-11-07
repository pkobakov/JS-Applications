function attachEvents() {
    let createBtn = document.getElementById('btnCreate');
    let loadBtn = document.getElementById('btnLoad');
    let phonebook = document.getElementById('phonebook');
    let person = document.getElementById('person');
    let phone = document.getElementById('phone');

    createBtn.addEventListener('click', () => {
        fetch('http://localhost:3030/jsonstore/phonebook', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                person: person.value,
                phone: phone.value
            })
        })
        .then(() => {
            person.value = '';
            phone.value = '';
        })
        .catch(err => console.log(err));
    });

    loadBtn.addEventListener('click', () => {
        fetch('http://localhost:3030/jsonstore/phonebook')
        .then(response => response.json())
        .then(data => {
            let entries = Object.entries(data);
            let html = entries.map(e => `<li>${e[1].person}: ${e[1].phone}<button id="${e[0]}">Delete</button></li>`).join('');
            phonebook.innerHTML = html;

            let deleteBtns = Array.from(document.querySelectorAll('button'));
            deleteBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    fetch(`http://localhost:3030/jsonstore/phonebook/${btn.id}`, {
                        method: 'DELETE'
                    })
                    .then(() => {
                        btn.parentNode.remove();
                    })
                    .catch(err => console.log(err));
                });
            });
        })
        .catch(err => console.log(err));
    });
}

attachEvents();