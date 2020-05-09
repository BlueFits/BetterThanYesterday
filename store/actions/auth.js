import { AsyncStorage } from "react-native";

export const AUTHENTICATE = "AUTHENTICATE";

//Server
import ServerRoot from "../../config/serverConfig";
const Root = ServerRoot.development;

export const authenticate = (userId, token) => {
    return {
        type: AUTHENTICATE,
        userId,
        token,
    };
};

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
                
            dispatch(authenticate(resData.userId, resData.token));
            const expiresIn = new Date(new Date().getTime() + 43200 * 1000);
            saveDataToStorage(resData.token, resData.userId, expiresIn);
        }    
    };
};

const saveDataToStorage = (token, userId, expiration) => {
    AsyncStorage.setItem("userData", JSON.stringify({
        token,
        userId,
        expiryDate: expiration.toISOString(),
    }));
};