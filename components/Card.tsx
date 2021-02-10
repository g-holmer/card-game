import React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "react-native-elements";
interface Props {
  randomCard: any;
}

const Card = (props: Props) => {
  return (
    <View style={styles.cardWrapper}>
      <Image
        resizeMode="contain"
        style={styles.CardImage}
        source={{
          uri: props.randomCard.image,
        }}
      />
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardWrapper: {
    margin: 10,
  },
  CardImage: {
    width: 100,
    height: 160,
  },
});
