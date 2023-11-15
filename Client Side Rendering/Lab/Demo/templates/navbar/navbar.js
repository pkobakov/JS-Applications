import { buttonsTemplate } from "./buttons.js"

export const navbarTemplate = (buttons) => {
    return `
<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Templating demo</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          ${buttons.map((button) => buttonsTemplate(button)).join('')}  
        </ul>
      </div>
    </div>
</nav>
    `
}