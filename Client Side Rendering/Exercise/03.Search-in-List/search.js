import { render } from '../node_modules/lit-html/lit-html.js'
import { template } from './template.js'
import { towns } from './towns.js'

render(template(towns), document.querySelector('body'))

document.addEventListener('click', e => {
	if (e.target.tagName === 'BUTTON') {
		const value = document.getElementById(`searchText`).value
		const towns = [...document.getElementsByTagName('li')]
		let counter = 0

		towns.forEach(x => {
			x.className = ''
			if (x.innerText.toLocaleLowerCase().includes(value.toLocaleLowerCase())) {
				x.className = 'active'
				counter += 1
			}
		})

		document.getElementById('result').innerText =
			counter !== 0
				? `${counter} matches found`
				: ''
	}
})