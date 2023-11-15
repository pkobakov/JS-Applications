import { navbarTemplate } from "./navbar/navbar.js";
export const appTemplate = (buttons) => {
    return`
    <header>
    ${navbarTemplate(buttons)}
    </header>
    <main>
    </main>`;
}