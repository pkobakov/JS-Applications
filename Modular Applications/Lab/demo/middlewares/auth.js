import { getAuthState } from "../services/auth_service.js";

export function injectAuth(ctx, next){
    ctx.authState = getAuthState();

    next();
}