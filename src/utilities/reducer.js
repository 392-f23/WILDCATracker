
export const initialLoginState = {
    user: null
};

export const loginActions = {
    set_user: "set_user"
};

export const reducer = (loginState, loginAction) =>{
    console.log("called reducer with:", loginAction);   
    switch(loginActions.type){
    case loginAction.set_user:
        return {
            user: loginAction.user
        };
    default:
        return {
            user: loginState.user
        };
    }
};

