async function getInfo() {
    
    const stopId = document.getElementById('stopId');
    const busId = stopId.value;
    const stopName = document.getElementById('stopName');
    const buses = document.querySelector('#buses');
    
    
    const url = `http://localhost:3030/jsonstore/bus/businfo/${busId}`;

    try {
        
        const response = await fetch(url);
        const data = await response.json();
    
        
        stopName.textContent = data.name;
        stopId.value = '';
        buses.innerHTML = '';
        
        
        for (const [bus, time] of Object.entries(data.buses)) {
            let listItem = document.createElement('li');
            listItem.textContent = `Bus ${bus} arrives in ${time} minutes`;
            buses.appendChild(listItem);
        }
         
    } catch (error) {
        appendErrorMsg();    
    }


    function appendErrorMsg(){
        clear();
        stopName.textContent = 'Error';
    }

    function clear(){
        stopId.value = '';
        buses.innerHTML = '';
    }
}


    
    
