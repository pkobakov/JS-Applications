import page from './node_modules/page/page.mjs';

import * as productsService from './services/products_service.js';
import * as authMiddleware from './middlewares/auth.js';

import { navbarView } from './views/navbar.js';
import { productsView } from './views/products.js';
import { registerView } from './views/register.js';
import { loginView } from './views/login.js';
import { logoutView } from './views/logout.js';

page(authMiddleware.injectAuth);
page(navbarView);
page.redirect('/', '/products');
page('/products', productsService.loadProducts, productsView);
page('/register', registerView);
page('/login', loginView);
page('/logout', logoutView);
page.start();

