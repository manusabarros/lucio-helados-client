import { createContext } from "react";

export const Context = createContext({
    setIsLoggedIn: (isLoggedIn: boolean) => {},
    user: {},
    setUser: (user: object) => {},
    authenticateResp: {} as any,
    presentLoading: () => {},
    dismissLoading: () => {},
    presentToast: (message: string) => {},
});
