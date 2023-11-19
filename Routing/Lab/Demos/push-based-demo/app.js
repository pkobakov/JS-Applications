const routes = {
    '/': () => '<h1>Home</h1>',
    '/home':() => '<h1>Home</h1>',
    '/about':() => '<h1>About</h1>',
    '/contacts':() => '<h1>Contacts</h1>'
}

function navigate(pathname, pushState){
    if (pushState) {
        console.log('update URL');
        history.pushState({}, "", pathname)
    }

    console.log('update conent');
    root.innerHTML = routes[pathname]();
}

const root = document.getElementById('root');
const body = document.querySelector('body');

body.addEventListener('click', (event) =>{
    if (event.target.tagName === 'A') {
        event.preventDefault();
        const href = new URL(event.target.href);
        console.log('href ', href);
        console.log('Link is clicked. pathname: ', href.pathname);
        navigate(href.pathname, true);
    }
});

window.addEventListener('popstate', () => {
    console.log('url is changed to: ', window.location.pathname);
    navigate(window.location.pathname, false);
});

if(window.location.pathname == '/'){
    root.innerHTML = routes['/home']();
}


// window.addEventListener('hashchange', () => {
//     const hash = window.location.hash;
//     root.innerHTML = routes[hash]();
// })

// root.innerHTML = routes[window.location.hash || '#home']();