export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

//Server
import ServerRoot from "../../config/serverConfig";
const Root = ServerRoot.development;

/*
export const signup = (email, password, rePassword) => {
    return async dispatch => {
        const response = await fetch(Root + "/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
                rePassword,
            }),
        });

        if (!response.ok) {
            throw new Error("Something went wrong");
        }
        //const resData = await response.json();
        
        dispatch({
            type: SIGNUP
        });
        
    };
};
*/
export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(Root + "/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (!response.ok) {
            const errResData = await response.json();
            throw new Error(errResData.error);
        } else {
            const resData = await response.json();
                
            dispatch({
                type: LOGIN,
                token: resData.token,
                userId: resData.userId,
            });
        }    
    };
};