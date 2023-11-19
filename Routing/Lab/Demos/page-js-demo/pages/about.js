const root = document.getElementById('root');

function aboutTemplate(){
    return '<h1>About</h1>';
}
export function loadAbout(context, next){
    root.innerHTML = aboutTemplate();
}