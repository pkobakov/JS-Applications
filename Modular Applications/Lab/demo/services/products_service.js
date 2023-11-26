import { products_url } from '../constants/index.js';
import * as httpService from './http_service.js';


const getAllProducts = () => httpService.get(products_url);

export const loadProducts = async (ctx, next) => {
    ctx.products = await getAllProducts();
    console.log(ctx.products);
    next();
}
    
