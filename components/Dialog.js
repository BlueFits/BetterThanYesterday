import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Dialog from "react-native-dialog";

const DialogComponent = ({ visibility, labelLeft, labelRight, labelLeftHandler, labelRightHandler, title, description }) => {

  const [inputText, setInputText] = useState();

  const descriptionElement = description ? (<Dialog.Description>{description}</Dialog.Description>) : null;

  return(
    <Dialog.Container visible={visibility}>
      <Dialog.Title>{title}</Dialog.Title>
        {descriptionElement}
        <View>
          <Dialog.Input  
          value={inputText} 
          style={styles.input}
          onChangeText={(text) => setInputText(text)}
          autoFocus={true}
          autoCapitalize="words"
          autoCorrect
          onSubmitEditing={labelRightHandler.bind(this, inputText)}
          >
          </Dialog.Input>
        </View>
      <Dialog.Button label={labelLeft} onPress={() => {
        setInputText(null);
        labelLeftHandler();
      }} />
      <Dialog.Button label={labelRight} onPress={() => {
        setInputText(null);
        labelRightHandler(inputText);
      }} />
    </Dialog.Container>
  );
};
const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
  },
});

export default DialogComponent;