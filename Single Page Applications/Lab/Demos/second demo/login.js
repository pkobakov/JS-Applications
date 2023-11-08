const loginSection = document.getElementById('login');

export function showLogin(){
    document.querySelector('main').replaceChildren(loginSection);
}