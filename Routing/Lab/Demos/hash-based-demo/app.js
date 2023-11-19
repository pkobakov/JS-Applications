const routes = {
    '/': '<h1>Home</h1>',
    '/home':() => '<h1>Home</h1>',
    '/about':() => '<h1>About</h1>',
    '/contacts':() => '<h1>Contacts</h1>'
}

const root = document.getElementById('root');
const body = document.querySelector('body');

body.addEventListener('click', (event) => {
    if (event.target.tagName == 'A') {
        event.preventDefault();

        const href = new URL(event.target.href);
        const pathName = href.pathname;

        history.pushState({}, '', pathName);
        root.innerHTML = routes[pathName]();
    }
});

if (window.location.pathname == '/') {
    root.innerHTML = routes['/home']();
}

root.innerHTML = routes[window.location.pathname]();

// window.addEventListener('hashchange', () => {
//     const hash = window.location.hash;
//     root.innerHTML = routes[hash]();
// })

// root.innerHTML = routes[window.location.hash || '#home']();