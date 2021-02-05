import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Button, Text } from "react-native-elements";

interface Props {
  drawHigherCardHandler: any;
  drawLowerCardHandler: any;
  hasDrawn: boolean;
}

const CardHandler = (props: Props) => {
  return (
    <>
      <Text style={{ fontSize: 17, marginTop: 10 }}>
        Guess Next Card: Higher/Lower
      </Text>
      <View style={styles.guessContainer}>
        {props.hasDrawn ? (
          <>
            <Button
              buttonStyle={{ padding: 18, margin: 10 }}
              title="Lower"
              onPress={props.drawHigherCardHandler}
            />
            <Button
              buttonStyle={{ padding: 18, margin: 10 }}
              title="Higher"
              onPress={props.drawHigherCardHandler}
            />
          </>
        ) : (
          <Button
            buttonStyle={{ padding: 18, margin: 10 }}
            title="Start"
            onPress={props.drawHigherCardHandler}
          />
        )}
      </View>
    </>
  );
};

export default CardHandler;

const styles = StyleSheet.create({
  guessContainer: {
    flexDirection: "row",
  },

  button: {
    maxHeight: 80,
    margin: 10,
    padding: 20,
    backgroundColor: "gray",
    color: "white",
  },
});
