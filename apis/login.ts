import { postAction } from "./manage";

export const login = (params) => postAction('/users/login', params);

export const register = (params) => postAction('/users', params)
