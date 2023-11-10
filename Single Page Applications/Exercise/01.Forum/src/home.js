import { showDetails } from "./details.js";


const url = 'http://localhost:3030/jsonstore/collections/myboard/posts';
const main = document.querySelector('main');
const topicContent =  document.querySelector('div.topic-title');
const section = document.querySelector('div.new-topic-border');
const form = main.querySelector('form');
const cancelBtn = form.querySelector('.cancel');

cancelBtn.addEventListener('click', clearForm);
form.addEventListener('submit', onSubmit);
section.remove();

export async function showHome(event){
    event && event.preventDefault();
    topicContent.innerHTML = '';
    const topics = await getAllPosts();

    Object.values(topics).forEach(topic => {
        const template = createTopic(topic);
        topicContent.appendChild(template);
    });
    
    
    topicContent.querySelector('a.normal')?.addEventListener('click', showDetails);

    main.replaceChildren(section);
    main.appendChild(topicContent);
}

function clearForm(event){
    event && event.preventDefault();
   form.reset();
}

async function onSubmit(event){
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const topicName = formData.get('topicName');
    const username = formData.get('username');
    const postText = formData.get('postText');
    const createdOn = new Date().getTime();

    createPost({topicName, username, postText, createdOn});
    
    
}

async function createPost(data){
    await fetch(
        url, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }
    );

    clearForm();
    showHome();
}

async function getAllPosts(){
    const response = await fetch(url);
    const data = await response.json();

    return data;
}

function createTopic(data){

    const div = document.createElement('div');
    div.classList.add('topic-container');

    div.innerHTML = 
     `  <div class="topic-name-wrapper">
            <div class="topic-name">
                <a href="#" class="normal" data-id="${data._id}">
                <h2>${data.topicName}</h2>
                </a>
                <div class="columns">
                    <div>
                        <p>Date: <time>${new Date(data.createdOn).toISOString()}</time></p>
                        <div class="nick-name">
                            <p>Username: <span>${data.username}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

    return div;
}