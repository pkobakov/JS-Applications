function solve() {

    const uriBase = `http://localhost:3030/jsonstore/bus/schedule/`;
    const span = document.querySelector('.info');
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');
    let nextStop = 'depot';
    let currentStop = '';

    async function depart() {
     
       const response = await fetch(uriBase + nextStop);
       const data = await response.json(); 

       span.textContent = `Next stop ${data.name}`
       nextStop = data.next;
       currentStop = data.name;
       arriveBtn.disabled = false; 
       departBtn.disabled = true;
    }

    function arrive() {
       span.textContent = `Arriving at ${currentStop}`; 
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();