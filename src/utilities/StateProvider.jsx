import React from "react";

import { createContext, useReducer } from "react";

export const LoginContext = createContext();

const LoginStateProvider = ({children, reducer, initialLoginState}) => (
    <LoginContext.Provider value={useReducer(reducer, initialLoginState)}>
        {children}
    </LoginContext.Provider>
);

export default LoginStateProvider;
