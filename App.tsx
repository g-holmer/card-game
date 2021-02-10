import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import CardPage from "./pages/CardPage";
import { SafeAreaProvider } from "react-native-safe-area-context";
interface Props {}

const App = (props: Props) => {
  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar style="auto" />
      <CardPage />
    </SafeAreaProvider>
  );
};

export default App;

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
  container: {
    marginTop: 100,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
