import { createContext } from "react";

export const AuthContext = createContext({
    token: null,
    userId: null,
    username: null,
    isAuthenticated: false
})