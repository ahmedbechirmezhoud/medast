import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import Colors from "../Colors";

export default function DeviceScreen() {
  const [time, setTime] = React.useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (time < 0) {
      setTime(0);
    }
  }, [time]);

  return (
    <Pressable style={styles.container} onPress={() => setTime(5)}>
      <FontAwesome
        size={30}
        style={{
          marginLeft: Dimensions.get("window").width / 2 - 50,
          marginBottom: -3,
          paddingTop: 15,
          paddingLeft: 20,
          paddingRight: 20,
          padding: 10,
          borderRadius: 100,
          borderColor: Colors["primaryColor"],
          borderWidth: 3,
          backgroundColor: Colors["primaryColor"],
          width: 65,
          alignItems: "center",
          justifyContent: "center",
          margin: 5,
        }}
        name="inbox"
        color={Colors["gray"]}
      />
      <Text style={styles.title}>SMART HOKA</Text>
      <View
        style={{
          width: Dimensions.get("window").width / 2 - 70,
          alignItems: "center",
          justifyContent: "space-around",
          flexDirection: "row",
        }}
      >
        <FontAwesome
          size={10}
          style={{ marginBottom: -3, margin: 5 }}
          name="circle"
          color={Colors["primaryColor"]}
        />
        <Text>Connected</Text>
      </View>
      <Text style={{ fontSize: 20, fontWeight: "400", padding: 70 }}>
        Next Alarm in <Text>{time}s</Text>
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: "30%",
    paddingLeft: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
  },
});
