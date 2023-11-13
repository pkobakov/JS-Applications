const login = document.getElementById('login-view');
const main = document.getElementById('main');

export function showLogin(){
   main.replaceChildren(login);
}