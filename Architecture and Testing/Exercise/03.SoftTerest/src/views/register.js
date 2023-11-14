import { register } from "../api/user_manager.js";

const registerView = document.getElementById('register-view');
const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);

export function showRegister(context){
  context.renderer(registerView);
}

async function onSubmit(event){
  event.preventDefault();
  const formData = new FormData(event.target)
  const {email, password, repeatPassword} = Object.fromEntries(formData);

  if (email.length < 3 || password.length < 3 || password !== repeatPassword) {
    return alert('Error');
    
  }

  await register (email, password);
  form.reset();
  debugger
}