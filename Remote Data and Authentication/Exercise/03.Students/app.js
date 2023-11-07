let submit = document.getElementById('submit');
let firstname = document.getElementsByName('firstName')[0];
let lastname = document.getElementsByName('lastName')[0];
let facultyNumber = document.getElementsByName('facultyNumber')[0];
let grade = document.getElementsByName('grade')[0];
let tbody = document.querySelector('tbody');
let url = 'http://localhost:3030/jsonstore/collections/students';

submit.addEventListener('click', (e) => {
    e.preventDefault();
    let student = {
        firstName: firstname.value,
        lastName: lastname.value,
        facultyNumber: facultyNumber.value,
        grade: grade.value
    };

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student)
    })
    .then(() => {
        firstname.value = '';
        lastname.value = '';
        facultyNumber.value = '';
        grade.value = '';
    })
    .catch(err => console.log(err));



});

function loadStudents() {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        let students = Object.values(data);
        let html = students.map(s => `<tr><td>${s.firstName}</td><td>${s.lastName}</td><td>${s.facultyNumber}</td><td>${s.grade}</td></tr>`).join('');
        tbody.innerHTML = html;
    })
    .catch(err => console.log(err));
}

loadStudents();