import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { StyleSheet, Text, View } from "react-native";
import { getNetworkStateAsync } from "expo-network";
import { Alert, BackHandler } from "react-native";
import { useState, useEffect } from "react";
import Navigation from "./navigation";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC_Bv1FUNtUUDW_Mida2MU-IhLFZRqP3VM",
  authDomain: "medast-1e0a2.firebaseapp.com",
  projectId: "medast-1e0a2",
  storageBucket: "medast-1e0a2.appspot.com",
  messagingSenderId: "666908377974",
  appId: "1:666908377974:web:4b4d2830800c1827267057",
  measurementId: "G-0575HQNJKT",
};

export default function App() {
  const [connected, setConnected] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    initializeApp(firebaseConfig);
    getNetworkStateAsync().then((state) => {
      setConnected(state.isConnected && state.isInternetReachable);
    });
  }, []);

  useEffect(() => {
    connected === false &&
      Alert.alert(
        "network problem",
        "Please Check your Internet Connection then retry. ",
        [
          {
            text: "Exit",
            onPress: () => BackHandler.exitApp(),
          },
        ],
        {
          cancelable: true,
          onDismiss: () => BackHandler.exitApp(),
        }
      );
  }, [connected]);

  if (!connected) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    justifyContent: "center",
  },
});
