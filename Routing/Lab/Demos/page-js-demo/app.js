import page from './node_modules/page/page.mjs'; 
import { loadHome } from './pages/home.js';
import { loadAbout } from './pages/about.js';
import { loadContacts } from './pages/contacts.js';
import { loadRecipes } from './pages/recipes.js';
import { loadRecipe } from './pages/recipeDetails.js';

page.redirect('/', '/home');
page('/home', loadHome);
page('/about', loadAbout);
page('/contacts', loadContacts);
page('/recipes/:recipeId', loadRecipe);
page('/recipes', loadRecipes);
page.start();