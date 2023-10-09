/* 
    to use the Login state, call React.useContext(LoginContext)
    returns => [firebase user object, function reference that could be called to update login state]
*/

import React from "react";

import { createContext, useReducer } from "react";

export const LoginContext = createContext();

const LoginStateProvider = ({ children, reducer, initialLoginState }) => (
	<LoginContext.Provider value={useReducer(reducer, initialLoginState)}>
		{children}
	</LoginContext.Provider>
);

export default LoginStateProvider;
