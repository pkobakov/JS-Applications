import { render } from '../../node_modules/lit-html/lit-html.js'
import { dropdownTemp } from './templates.js'
import { getData, postEntry } from './requester.js'


async function drawOptions () {
	const data = await getData()

	render(dropdownTemp(Object.values(data)), document.querySelector('body'))
}

await drawOptions()

document.addEventListener('submit', async e => {
	e.preventDefault()
	const input = document.getElementById(`itemText`)

	await postEntry({
		text: input.value
	})
	await drawOptions()
	input.value = ''
})