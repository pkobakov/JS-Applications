async function solution() {

    const url = `http://localhost:3030/jsonstore/advanced/articles/list`;

    const main = document.getElementById('main');

    const response = await fetch(url);
    const data = await response.json();

    data.forEach(element => {

        let divAccordeon = createElement('div', '', ['class', 'accordion']);
        let divHead = createElement('div', '', ['class', 'head']);

        let span = createElement('span', element.title);
        let button = createElement('button', 'More', ['class', 'button', 'id', element._id]);

        let divExtra = createElement('div', '', ['class', 'extra']);
        let p = createElement('p');

        button.addEventListener('click', toggle);

        divHead.appendChild(span);
        divHead.appendChild(button);

        divExtra.appendChild(p);
        divAccordeon.appendChild(divHead);
        divAccordeon.appendChild(divExtra);

        main.appendChild(divAccordeon);

    })
    async function toggle(e) {

        let id = e.target.id;
        let url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;

        let accordeon = e.target.parentElement.parentElement;

        let p = accordeon.querySelector('p')

        let extra = accordeon.querySelector('.extra');

        const response = await fetch(url);
        const data = await response.json();

        p.textContent = data.content;

        const hidden = e.target.textContent === 'More';

        extra.style.display = hidden ? 'block' : 'none';
        e.target.textContent = hidden ? 'Less' : 'More';

    }


    function createElement(type, content, attributes = []) {
        let element = document.createElement(type);
        if (content) {
            element.textContent = content;
        }
        if (attributes.length > 0) {
            for (let i = 0; i < attributes.length; i += 2) {
                element.setAttribute(attributes[i], attributes[i + 1])
            }
        }
        return element;
    }

}
solution()