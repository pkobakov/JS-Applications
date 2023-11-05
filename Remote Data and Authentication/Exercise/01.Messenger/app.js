function attachEvents() {
    const uri = 'http://localhost:3030/jsonstore/messenger';
    document.getElementById('refresh').addEventListener('click', onLoadComments);
    const textArea = document.getElementById('messages');

    document.getElementById('submit').addEventListener('click', onSubmitComment);


    
    async function onLoadComments(event){
        textArea.textContent = '';
        const response = await fetch(uri);
        const data = await response.json();
        
        Object.values(data).forEach(row => {
            textArea.textContent += `${row.author}: ${row.content}\n`
        });

        textArea.textContent = textArea.textContent.trim();
        
    }
    
    async function onSubmitComment(event){
        
        const data = document.querySelectorAll("#controls input[type='text']");
        const author = data[0].value;
        const content = data[1].value;

        const post = {author, content};
        
        const options = {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(post)
        }

        const response = await fetch(uri, options);
        response.json();
        
        data[0].value = '';
        data[1].value = '';
        
    }

}

attachEvents();