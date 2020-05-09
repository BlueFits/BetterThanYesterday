import React from "react";
import { View, StyleSheet, Animated } from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";

//Components
import BtyLogo from "../../components/images/BtyLogo";
import AuthButton from "../../components/authentication/AuthButton";
//Constants
import Colors from "../../constants/Colors";

const AuthenticationOptions = ({ navigation }) => {
    return (
        <View style={styles.screen}>
            <Animated.View style={styles.logoContainer}>
                <BtyLogo />
            </Animated.View>

            <Animated.View style={styles.options}>
                {/*
                <AuthButton 
                    IconSettings={{
                        iconPack: AntDesign,
                        name: "google",
                    }}
                    style={{
                        backgroundColor: "#3498db",
                    }}
                    buttonText={"Continue with Google"}
                    onPress={() => alert()}
                />

                <AuthButton 
                    IconSettings={{
                        iconPack: Entypo,
                        name: "facebook-with-circle"
                    }}
                    style={{
                        backgroundColor: "#34495e",
                    }}
                    buttonText={"Continue with Facebook"}
                    onPress={() => alert()}
                />
                 */}
                <AuthButton 
                    IconSettings={{
                        name: "notSet"
                    }}
                    style={{
                        backgroundColor: Colors.red,
                    }}
                    buttonText={"Sign up"}
                    textStyle={{ textAlign: "center", }}
                    onPress={() => navigation.navigate("register")}
                />

                <AuthButton 
                    IconSettings={{
                        name: "notSet"
                    }}
                    style={{
                        backgroundColor: "#fff",
                        borderWidth: 1,
                        borderColor: Colors.black,
                    }}
                    buttonText={"Log in"}
                    textStyle={{ textAlign: "center", color: Colors.black}}
                    onPress={() => navigation.navigate("login")}
                />
            </Animated.View>
        </View>
    );
};
//Constants
const middleSpace = 25;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },  
    logoContainer: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: middleSpace,
    },
    options: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        paddingTop: middleSpace,
    },
});

export default AuthenticationOptions;