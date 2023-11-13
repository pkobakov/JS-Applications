const register = document.getElementById('register-view');
const main = document.getElementById('main');

export function showRegister(){
   main.replaceChildren(register);
}