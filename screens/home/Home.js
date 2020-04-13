import React, {useEffect} from "react";
import { Text, View, StyleSheet, Button } from "react-native";

//Components
import TaskReviewer from "../../components/TaskReviewer";

const Home = ({ route }) => {
    let { headerValue } = route.params;
    return (
        <View style={styles.content}>
            <TaskReviewer title={headerValue}/>
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: "#fff",
        paddingVertical: 20,
        paddingHorizontal:30,
    },
});

export default Home;