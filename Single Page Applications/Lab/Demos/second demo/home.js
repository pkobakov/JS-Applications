const homeSection = document.getElementById('home');

export function showHome(){
    document.querySelector('main').replaceChildren(homeSection); 
}