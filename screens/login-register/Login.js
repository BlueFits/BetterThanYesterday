import React, { useState } from "react";
import { 
    View, 
    StyleSheet, 
    TouchableWithoutFeedback, 
    ScrollView, TextInput, 
    KeyboardAvoidingView, 
    Keyboard,
    ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
//Header Custom Component
import CustomBackButton from "../../components/HeaderButtonDark";
//Redux Actions
import { login } from "../../store/actions/auth";
//Components
import AuthButton from "../../components/authentication/AuthButton";
//CONSTANTS
import Colors from "../../constants/Colors";
import { SmallText } from "../../controllers/TextController";

const Login = ({ navigation, route }) => {
    //Initialize
    const dispatch = useDispatch();
    //States
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState(route.params ? route.params.email : "");
    const [password, setPassword] = useState("");
    //Error Management
    const [error, setError] = useState();
    async function loginHandler() {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(login(email, password));
            //NAVIGATE AWAY
        } catch(err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    //Navigation options
    navigation.setOptions({
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomBackButton}>
                <Item 
                    title="BACK" 
                    iconName="md-arrow-back"
                    onPress={() => navigation.navigate("menu")}
                />
            </HeaderButtons>
        ),
    });

    //Conditionals
    let loginButton = (
        <AuthButton 
            IconSettings = {{
                name: "notSet"
            }}
            style={{
                backgroundColor: Colors.red,
            }}
            buttonText={"Login"}
            textStyle={{ textAlign: "center", }}
            onPress={loginHandler}
        />
    );

    return (
        <TouchableWithoutFeedback touchSoundDisabled={true} onPress={() => Keyboard.dismiss()}>
            <ScrollView style={{ height: "100%"}}>
                <KeyboardAvoidingView>
                        <View style={styles.screen}>
                                <View style={styles.inputContianer}>
                                    <TextInput 
                                        value={route.params ? route.params.email : email}
                                        onChangeText={text => setEmail(text)}
                                        placeholder="Email" 
                                        style={styles.input}
                                        autoCompleteType="email" 
                                        keyboardType="email-address" 
                                        textContentType="emailAddress"
                                    />
                                    <TextInput 
                                        value={password}
                                        onChangeText={text => setPassword(text)}
                                        placeholder="Password" 
                                        style={styles.input} 
                                        secureTextEntry={true} 
                                    />
                                </View>

                                <View style={{ marginBottom: 15}}>
                                    <SmallText style={{ color: "red" }}>{error}</SmallText>
                                </View>

                                <View>
                                    { isLoading ? <ActivityIndicator color={Colors.red}/> :  loginButton}
                                    {/*<AuthButton 
                                        IconSettings = {{
                                            name: "notSet"
                                        }}
                                        style={{
                                            backgroundColor: Colors.red,
                                        }}
                                        buttonText={"Login"}
                                        textStyle={{ textAlign: "center", }}
                                        onPress={loginHandler}
                                    />*/}
                                    <AuthButton 
                                        IconSettings = {{
                                            name: "notSet"
                                        }}
                                        style={{
                                            backgroundColor: "transparent",
                                            borderColor: Colors.black,
                                        }}
                                        buttonText={"Don't have an account?"}
                                        textStyle={{ textAlign: "center", color: Colors.black }}
                                        onPress={() => navigation.navigate("register")}
                                    />
                                </View>
                        </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen : {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputContianer: { 
        width: "80%", 
        marginTop: 30,
    },
    input: { 
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 5,
        borderWidth: 1, 
        borderColor: Colors.grey,
        marginBottom: 15,
    },
});

export default Login;