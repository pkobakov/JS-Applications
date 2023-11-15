import { navbarTemplate } from "./navbar/navbar.js";
import { recipesTemplate } from "./recipes/recipesTemplate.js";

export const appTemplate = (buttons, recipes ) => {
    return`
    <header>
    ${navbarTemplate(buttons)}
    </header>
    <main>
    ${recipesTemplate(recipes)}
    </main>`;
}