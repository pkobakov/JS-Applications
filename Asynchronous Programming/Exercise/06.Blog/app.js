async function attachEvents() {
    const baseURI = 'http://localhost:3030/jsonstore/blog/';
    const postEndpoint = 'posts/';
    const commentsEndpoint = 'comments';
    let allRecords = {};
    
    const loadPostsBtn = document.getElementById('btnLoadPosts');
    loadPostsBtn.addEventListener('click', createOptions);
    
    const  viewPostBtn = document.getElementById('btnViewPost'); 
    viewPostBtn.addEventListener('click', loadPostData);

    const selectList = document.getElementById('posts');
    const title = document.getElementById('post-title');
    const description = document.getElementById('post-body');
    const commentsUl = document.getElementById('post-comments');



    async function createOptions(event){
        selectList.innerHTML = '';
        const posts = await getAllPosts();
        allRecords = posts;
        Object.entries(posts).forEach(post => {
            const option  = generateDomElement('option', post[1].title, post[1].id);
            selectList.appendChild(option);
        })
    }
    
    
    
    
    
    async function loadPostData(event){
        const postId = selectList.value;
            const post = Object.values(allRecords).filter(p => p.id === postId);

            title.textContent = post[0].title;
            description.textContent = post[0].body;
            loadComments(postId);
    }

 
    
    async function getAllPosts(){
        const response = await fetch(baseURI+postEndpoint);
        const data = await response.json();
        return data;
    }
    
    async function loadComments(postId){
        commentsUl.innerHTML = '';
        const comments = await getAllComments(); 
        const currentComments = Object.values(comments).filter(x => x.postId === postId);
        currentComments.forEach(comment => {
           const li = generateDomElement('li', comment.text);
           commentsUl.appendChild(li);
        });
    }
    
    async function getAllComments(){
        const response = await fetch(baseURI + commentsEndpoint);
        const data = await response.json();
        return data;
    }
    
    function generateDomElement(type, content, id, classes, style){
        const el = document.createElement(type);
        
        if (type === 'input' && type === 'textarea') {
            el.textContent = content;
        } else if(type === 'option'){
            el.value = id;
            el.textContent = content;
        } else{
            el.textContent = content;
        }
        
        return el;
        
    }
    
}

attachEvents();