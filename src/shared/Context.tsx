import { createContext } from "react";

export const Context = createContext({
    setIsLoggedIn: (isLoggedIn: boolean) => {},
    user: {},
    setUser: (user: object) => {},
    refetch: () => new Promise(() => {}),
    presentLoading: () => {},
    dismissLoading: () => {},
    presentToast: (message: string) => {},
});
