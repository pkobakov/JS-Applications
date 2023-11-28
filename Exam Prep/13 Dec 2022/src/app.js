import page from '../node_modules/page/page.mjs';

import { authMiddleware } from './middleware/auth_middleware.js';
import { navbarView } from './views/navbar.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';
import { logoutView } from './views/logout.js';
import { getProducts, getProduct } from './services/products_service.js';
import { productsView } from './views/products.js';
import { createProductView } from './views/create.js';
import {productDetailsView} from './views/details.js';
import { editProductView } from './views/edit.js';
import { deleteView } from './views/delete.js';




page(authMiddleware);
page(navbarView);
page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutView);
page('/products', getProducts, productsView);
page('/create', getProducts, createProductView);
page('/products/:id', getProduct, productDetailsView);
page('/edit/:id', getProduct, editProductView);
page('/delete/:id', deleteView);
page.start();