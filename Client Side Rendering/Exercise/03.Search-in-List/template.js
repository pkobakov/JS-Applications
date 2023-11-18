import { html} from '../node_modules/lit-html/lit-html.js';

const template = (towns) => html`
    <article>
        <div id="towns">
            <ul>
                ${towns.map(x => html`
                    <li>${x}</li>`)}
            </ul>
        </div>
        <input type="text" id="searchText"/>
        <button>Search</button>
        <div id="result"></div>
    </article>`

export { template }