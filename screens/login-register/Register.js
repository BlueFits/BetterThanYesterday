import React, {useState } from "react";
import { 
    View, 
    StyleSheet, 
    TextInput, 
    TouchableWithoutFeedback, 
    Keyboard, 
    KeyboardAvoidingView, 
    ScrollView,
    ActivityIndicator, 
} from "react-native";
import validator from "validator";
import { useDispatch } from "react-redux";

//CONSTANTS
import Colors from "../../constants/Colors";
//COMPONENTS
import AuthButton from "../../components/authentication/AuthButton";
import { SmallText } from "../../controllers/TextController";
//Server
import ServerRoot from "../../config/serverConfig";
const Root = ServerRoot.production;

const Register = ({ navigation }) => {
    //Initialize
    const dispatch = useDispatch();
    //State Management
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    //Error Styles
    const [isLoading, setIsLoading] = useState(false);
    const [errState, setErrState] = useState({
        email: {
            msg: " ",
            style: {},
        },
        password: {
            msg: " ",
            style: {},
        },
        rePassword: {
            msg: " ",
            style: {},
        },
    });
    //Handlers
    async function registerHandler () {
        /* Error Handling */ 
        const errStateCopy = {...errState};

        if (validator.isEmpty(email)) {
            errStateCopy.email.msg = "This field is required";
            errStateCopy.email.style = { borderColor: "red" };
        } else if (!validator.isEmail(email)) {
            errStateCopy.email.msg = "Invalid email";
            errStateCopy.email.style = { borderColor: "red" };
        } else {
            errStateCopy.email.msg = " ";
            errStateCopy.email.style = {};
        }

        if (validator.isEmpty(password)) {
            errStateCopy.password.msg = "This field is required";
            errStateCopy.password.style = { borderColor: "red" };
        } else {
            errStateCopy.password.msg = " ";
            errStateCopy.password.style = {};
        }

        if (validator.isEmpty(rePassword)) {
            errStateCopy.rePassword.msg = "This field is required";
            errStateCopy.rePassword.style = { borderColor: "red" };
        } else {
            errStateCopy.rePassword.msg = " ";
            errStateCopy.rePassword.style = {};
        }

        if (!validator.isEmpty(password) && !validator.isEmpty(rePassword)) {
            if (password !== rePassword) {
                errStateCopy.password.msg = " ";
                errStateCopy.rePassword.msg = "Passwords do not match";
                errStateCopy.password.style = { borderColor: "red" };
                errStateCopy.rePassword.style = { borderColor: "red" };
            }
        }

        if (errState.email.msg === " " && errState.password.msg === " " && errState.rePassword.msg === " ") {
            setIsLoading(true);
            
            const response = await fetch(Root + "/users/register", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },  
                body: JSON.stringify({
                    email,
                    password, 
                    rePassword,
                }),
            });

            const resData = await response.json();
            
            if (!resData.isValid) {
                setIsLoading(false);
                errStateCopy.email.msg = resData.msg;
                errStateCopy.email.style = { borderColor: "red" };
            } else {
                navigation.navigate("login", { email });
            }       
        }

        setErrState(errStateCopy);
    };

    return (
        <TouchableWithoutFeedback touchSoundDisabled={true} onPress={() => Keyboard.dismiss()}>
            <ScrollView  keyboardShouldPersistTaps={"handled"} style={{ height: "100%" }}>
                <KeyboardAvoidingView>
                        <View style={styles.screen}>
                                <View style={styles.inputContianer}>
                                    <View style={styles.inputWithText}>
                                        <TextInput 
                                            value={email}
                                            onChangeText={(text) => setEmail(text)}
                                            placeholder="Email" 
                                            style={{...styles.input, ...errState.email.style}}
                                            autoCompleteType="email" 
                                            keyboardType="email-address" 
                                            textContentType="emailAddress"
                                            onSubmitEditing={() => Keyboard.dismiss()}
                                        />
                                        <SmallText style={styles.errorText}>{errState.email.msg}</SmallText>
                                    </View>
                
                                    <View style={styles.inputWithText}>
                                        <TextInput 
                                            value={password}
                                            onChangeText={(text) => setPassword(text)}
                                            placeholder="Password" 
                                            style={{...styles.input, ...errState.password.style}} 
                                            secureTextEntry={true} 
                                            onSubmitEditing={() => Keyboard.dismiss()}
                                        />

                                        <SmallText style={styles.errorText}>{errState.password.msg}</SmallText>
                                    </View>
                                
                                    <View style={styles.inputWithText}>
                                        <TextInput 
                                            value={rePassword}
                                            onChangeText={(text) => setRePassword(text)}
                                            placeholder="Re-enter password" 
                                            style={{...styles.input, ...errState.rePassword.style}} 
                                            secureTextEntry={true} 
                                            onSubmitEditing={registerHandler}
                                        />
                                        
                                        <SmallText style={styles.errorText}>{errState.rePassword.msg}</SmallText>
                                    </View>
                                
                                </View>

                                <View>
                                    { isLoading ? <ActivityIndicator color={ Colors.red }/> : <AuthButton 
                                        IconSettings = {{
                                            name: "notSet"
                                        }}
                                        style={{
                                            backgroundColor: Colors.red,
                                        }}
                                        buttonText={"Register"}
                                        textStyle={{ textAlign: "center", }}
                                        onPress={registerHandler}
                                    /> }
                                    <AuthButton 
                                        IconSettings = {{
                                            name: "notSet"
                                        }}
                                        style={{
                                            backgroundColor: "transparent",
                                            borderColor: Colors.black,
                                        }}
                                        buttonText={"Already have an account?"}
                                        textStyle={{ textAlign: "center", color: Colors.black }}
                                        onPress={() => navigation.navigate("login")}
                                    />
                                </View>
                        </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

//Styles
const styles = StyleSheet.create({
    screen : {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputContianer: { 
        width: "80%", 
        marginTop: 30,
        marginBottom: 10,
    },
    inputWithText: {
        //borderWidth: 1,
    },
    input: { 
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 5,
        borderWidth: 1, 
        borderColor: Colors.grey,
    },
    errorText: {
        color: "red",
        marginLeft: 10,
    },
});

export default Register;