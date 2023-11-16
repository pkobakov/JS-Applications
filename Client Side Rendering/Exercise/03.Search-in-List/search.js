import { towns } from "./towns.js";
import{html, render} from '../node_modules/lit-html/lit-html.js';

const section = document.getElementById('towns');
const searchBtn = document.querySelector('article button').addEventListener('click', search)
searchTemplate(towns);

function searchTemplate(towns, matches){
  const template = html`<ul>
                           ${towns.map(town => createTemplate(town, matches))}
                        </ul>`;
   render(template, section)
}

function createTemplate(data, match, i){
   return html`<li id="${i}" class=${match?.includes(data) ? 'active' : ''}>${data}</li>`;
};

function update(matches){
   const matchesText = matches.length > 1 ? 'matches found' : 'match found';
   const text = matches.length > 0 ? `${matches.length} ${matchesText}` : '';
   document.getElementById('result').innerText = text;
   searchTemplate(towns, matches);
}

function search(event){
   const searchInput = document.getElementById('searchText');
   const text = searchInput.value;
   const match = towns.filter(town => town.includes(text));
   update(match);
}