start();

function start(){
     document.getElementById('create-btn').addEventListener('click', postData);
     document.getElementById('load').addEventListener('click', loadData);
     document.getElementById('save-btn').addEventListener('click', savePart);
     document.getElementById('table-body').addEventListener('click', tableAction);
     document.getElementById('cancel-btn').addEventListener('click', toggleEditors)
}

async function loadData(){
    const url = 'http://localhost:3030/jsonstore/autoparts';
    const response = await fetch(url);
    const data = await response.json();
    
    const rows = Object.values(data).map(createRow);
    document.getElementById('table-body').replaceChildren(...rows);
    
} 

async function postData(){
     const label = document.getElementById('label').value;
     const price = Number(document.getElementById('price').value);
     const qty = Number(document.getElementById('quantity').value);

     const partData = {
        label, 
        price, 
        qty
     }
    
     const url = 'http://localhost:3030/jsonstore/autoparts';

     const options = {
        method: 'post',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(partData)
     };

    const response = await fetch(url,options);
    const data = await response.json();

    loadData();

}

async function deleteData(recordId){

    const choice = confirm('Are you sure?');

    if (choice === false) {
        return;
    }

    const url = 'http://localhost:3030/jsonstore/autoparts/' + recordId;
    const options = {
        method: 'delete'
    } ;
    const response = await fetch(url, options);
    loadData();
}

async function tableAction (event){
   const target = event.target;
   if (target.tagName === 'BUTTON') {
    if (target.classList.contains('delete-btn')) {
        deleteData(target.dataset.id);
    } else if(target.classList.contains('edit-btn')){
        loadForEditing(target.dataset.id);
    }
   }
}

function createRow(record){
    const element =  document.createElement('tr');
    element.innerHTML = `
    <td>
        ${record._id}
    </td>
    <td>
        ${record.label}
    </td>
    <td>
        $ ${record.price}
    </td>
    <td>
       ${record.qty}
    </td>
    <td>
        <button data-id="${record._id}" class="delete-btn">Delete</button>
        <button data-id="${record._id}" class="edit-btn">Edit</button>

    </td>`

    return element;
}

async function loadForEditing(id){
    const url = `http://localhost:3030/jsonstore/autoparts/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    document.getElementById('editor-create').style.display = 'none';
    document.getElementById('editor-edit').style.display = 'block';

    document.getElementById('edit-id').value = data._id;
    document.getElementById('edit-label').value = data.label;
    document.getElementById('edit-price').value = data.price;
    document.getElementById('edit-quantity').value = data.qty;

}

async function savePart(){
    const  record = {};

    record._id = document.getElementById('edit-id').value ;
    record.label = document.getElementById('edit-label').value;
    record.price = document.getElementById('edit-price').value;
    record.qty = document.getElementById('edit-quantity').value;

    const url = `http://localhost:3030/jsonstore/autoparts/${record._id}`;
    const options = {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(record)
    }

    const response = await fetch(url,options);
    const result = response.json();

    toggleEditors();
    loadData();
}

function toggleEditors(){
    document.getElementById('editor-create').style.display = 'block';
    document.getElementById('editor-edit').style.display = 'none';
     
}

 