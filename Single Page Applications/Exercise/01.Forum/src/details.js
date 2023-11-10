const POSTS_URL = 'http://localhost:3030/jsonstore/collections/myboard/posts/';
const COMMENTS_URL = 'http://localhost:3030/jsonstore/collections/myboard/comments/';
const main = document.querySelector('main');
const section = document.getElementById('comments');
const createFormContainer = document.querySelector('div.answer-comment');
const form = createFormContainer.querySelector('form');
form.addEventListener('submit', onSubmit);
createFormContainer.remove();



section.remove();

let id = '';
export async function showDetails(event){
    id = event ? event.target.parentElement.dataset.id : id;
    const data = await getPost(id);
    const comments = await getCommentsById();
    const div = document.createElement('div');
    div.classList.add('comment');
    const topic = createCommentHeader(data);
    div.appendChild(topic);

    Object.values(comments).forEach(comment => {
        const commentElement =  createCommentBody(comment);
        div.appendChild(commentElement);
         
    })
    section.replaceChildren(div);
    section.appendChild(createFormContainer);
    main.replaceChildren(section);
}

async function onSubmit(event){
    event.preventDefault();

    const formData = new FormData(event.target);
    const postText = formData.get('postText');
    const username = formData.get('username');
    const date = new Date().getTime()

   
    createComment({postText, username, _topicId: id, date});
   clearForm();
    showDetails();
}

async function createComment(data){
    
    const response = await fetch(COMMENTS_URL, {
        method: 'post', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });


}

async function getPost(){
    const response = await fetch(POSTS_URL + id); 
    const data = await response.json();
    return data;
}

async function getCommentsById(){
    const response = await fetch(COMMENTS_URL);
    const data = await response.json();

    return Object.values(data).filter(c => c._topicId === id);
}

function createCommentHeader(data){
    const date = new Date(data.createdOn);
    const dateToString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const div = document.createElement('div');
    div.classList.add('header');
    div.innerHTML = `
                <img src="./static/profile.png" alt="avatar">
                <p><span>${data.username}</span> posted on <time>${dateToString}</time></p>
                <p class="post-content">${data.postText}
                </p>`;
    return div;            
}

function createCommentBody(data){
    const date = new Date(data.date);
    const dateToString = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDay()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `;
    const div = document.createElement('div');
    div.id = 'user-comment';
    div.innerHTML = `<div class="topic-name-wrapper">
                        <div class="topic-name">
                            <p><strong>${data.username}</strong> commented on <time>${dateToString}</time></p>
                            <div class="post-content">
                            <p>${data.postText}</p>
                            </div>
                        </div>
                    </div>`;
    return div;
}

function clearForm(event){
    event && event.preventDefault();
   form.reset();
}
