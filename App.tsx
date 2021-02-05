import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
} from "react-native";

interface Props {}

const App = (props: Props) => {
  const [createDeck, setCreateDeck]: any = useState(null);
  const [deck, setDeck]: any = useState(null);
  const [hasDrawn, setHasDrawn] = useState<boolean>(false);
  const [currentCardValue, setCurrentCardValue] = useState<number>(0);
  const [expectedValue, setExpectedValue] = useState<string>("");
  const [guessedRight, setGuessedRight] = useState<boolean>(false);
  useEffect(() => {
    fetch("https://deckofcardsapi.com/api/deck/new/")
      .then((res) => res.json())
      .then((data) => {
        setCreateDeck(data);
      });
  }, []);
  const handleCardValue = (value: string) => {
    if (value === "JACK") {
      setCurrentCardValue(11);
    } else if (value === "QUEEN") {
      setCurrentCardValue(12);
    } else if (value === "KING") {
      setCurrentCardValue(13);
    } else if (value === "ACE") {
      setCurrentCardValue(14);
    } else {
      setCurrentCardValue(parseInt(value));
    }
  };

  const drawHigherCardHandler = () => {
    const higher: string = "higher";
    setExpectedValue(higher);
    drawCardHandler();
  };
  const drawLowerCardHandler = () => {
    const lower: string = "lower";
    setExpectedValue(lower);
    drawCardHandler();
  };
  const drawCardHandler = () => {
    const newData: any = {
      success: true,
      deck_id: createDeck.deck_id,
      shuffled: true,
      remaining: createDeck.remaining--,
    };

    fetch(
      `https://deckofcardsapi.com/api/deck/${createDeck.deck_id}/shuffle/`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: newData,
      }
    )
      .then(function (res) {
        console.log(res);
      })
      .catch(function (res) {
        console.log(res);
      });

    fetch(
      `https://deckofcardsapi.com/api/deck/${createDeck.deck_id}/draw/?count=1`
    )
      .then((res) => res.json())
      .then((data) => {
        setDeck(data);
        handleCardValue(data.cards[0].value);
        setHasDrawn(true);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Guess Next Card: Higher/Lower</Text>
      <View style={styles.guessContainer}>
        <TouchableOpacity style={styles.button} onPress={drawHigherCardHandler}>
          <Text>Higher</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={drawLowerCardHandler}>
          <Text>Lower</Text>
        </TouchableOpacity>
      </View>
      {deck && hasDrawn && (
        <>
          <View style={styles.cardWrapper}>
            <Image
              resizeMode="contain"
              style={styles.tinyLogo}
              source={{
                uri: deck.cards[0].image,
              }}
            />
          </View>
          <View>
            <Text>Counter: {createDeck.remaining}</Text>
          </View>
        </>
      )}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  cardWrapper: {
    margin: 10,
  },
  guessContainer: {
    flexDirection: "row",
  },
  tinyLogo: {
    width: 100,
    height: 160,
  },
  button: {
    maxHeight: 80,
    margin: 10,
    padding: 20,
    backgroundColor: "gray",
    color: "white",
  },
  container: {
    marginTop: 100,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
