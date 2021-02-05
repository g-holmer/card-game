import React, { useState, useEffect } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import Card from "../components/Card";
import CardButtons from "../components/CardButtons";
import { Text, Button } from "react-native-elements";

interface Props {}

const CardPage = (props: Props) => {
  const [deck, setNewDeck]: any = useState(null);
  const [hasDrawn, setHasDrawn] = useState<boolean>(false);
  const [randomCard, setRandomCard] = useState<any>(null);
  const [drawnCards, setDrawnCards] = useState<any>([]);
  const [guessHigh, setGuessHigh] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [startGame, setStartGame] = useState<boolean>(false);
  useEffect(() => {
    fetch(`https://deckofcardsapi.com/api/deck/new/`)
      .then((res) => res.json())
      .then((data) => {
        fetch(
          `https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=52`
        )
          .then((res) => res.json())
          .then((data) => {
            const cards = data.cards.map(function (item: any) {
              let value;
              if (item.value === "JACK") {
                value = 11;
              } else if (item.value === "QUEEN") {
                value = 12;
              } else if (item.value === "KING") {
                value = 13;
              } else if (item.value === "ACE") {
                value = 14;
              } else {
                value = parseInt(item.value);
              }
              return {
                image: item.image,
                value: value,
                suit: item.suit,
                code: item.code,
              };
            });
            const deckData = { cards: cards, deck_id: data.deck_id };
            setNewDeck(deckData);
            setScore(0);
          });
      });
  }, [startGame]);

  useEffect(() => {
    if (drawnCards.length > 1) {
      let lastValue = drawnCards[drawnCards.length - 1].value;
      let nextLastValue = drawnCards[drawnCards.length - 2].value;

      if (guessHigh) {
        if (lastValue > nextLastValue) {
          setScore(score + 1);
        }
      } else {
        if (lastValue < nextLastValue) {
          setScore(score + 1);
        }
      }
    }
  }, [drawnCards]);

  const drawHigherCardHandler = () => {
    setGuessHigh(true);
    drawCardHandler();
  };
  const drawLowerCardHandler = () => {
    setGuessHigh(false);
    drawCardHandler();
  };
  const drawCardHandler = () => {
    const index = Math.floor(Math.random() * (deck && deck.cards.length));
    const randomCard = deck.cards[index];
    setRandomCard(randomCard);
    setHasDrawn(true);
    setDrawnCards((prevState: any) => [...prevState, randomCard]);

    deck.cards.splice(index, 1);
  };

  return (
    <>
      {randomCard && hasDrawn && (
        <>
          <Card randomCard={randomCard} />
        </>
      )}

      {deck && deck.cards.length > 0 ? (
        <>
          <Text h3>Score: {score}</Text>
          <Text h4 style={{ fontSize: 17, marginTop: 10 }}>
            Cards left: {deck && deck.cards.length}
          </Text>

          <CardButtons
            drawHigherCardHandler={drawHigherCardHandler}
            drawLowerCardHandler={drawLowerCardHandler}
            hasDrawn={hasDrawn}
          />
        </>
      ) : (
        <>
          {hasDrawn ? (
            <>
              <Text h3>Total Score: {score}</Text>
              <Text h4 style={{ color: "red" }}>
                Out of cards!
              </Text>
              <Button
                style={{ padding: 18 }}
                onPress={() => setStartGame(!startGame)}
                title="Play Again"
              />
            </>
          ) : (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
        </>
      )}
    </>
  );
};

export default CardPage;

const styles = StyleSheet.create({});
