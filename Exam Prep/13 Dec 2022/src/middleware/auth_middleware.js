import * as authService from '../services/auth_service.js';

export function authMiddleware(ctx, next){
    ctx.userdata = authService.getAuthData();
    next();
}  