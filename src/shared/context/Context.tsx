import { createContext } from "react";

export const Context = createContext({
    setIsLoggedIn: (isLoggedIn: boolean) => {},
});
