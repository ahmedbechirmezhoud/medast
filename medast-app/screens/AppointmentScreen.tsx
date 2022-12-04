import { FontAwesome } from "@expo/vector-icons";
import { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  Dimensions,
} from "react-native";
import Colors from "../Colors";

const data = [
  {
    id: 1,
    date: "12/10/2021",
    time: "10:00 AM",
    location: "Hopital Fatouma Bourguiba",
  },
  {
    id: 2,
    date: "24/10/2021",
    time: "10:00 AM",
    location: "Hopital Fatouma Bourguiba",
  },
  {
    id: 3,
    date: "09/11/2021",
    time: "8:00 AM",
    location: "Hopital Fatouma Bourguiba",
  },
];

export default function AppointmentScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.ScrollView style={[styles.appointment, { opacity: fadeAnim }]}>
        {data.map((ev: any, i: number) => (
          <Pressable
            style={{
              alignItems: "flex-start",
              width: Dimensions.get("window").width,
              paddingVertical: 8,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            key={i}
          >
            <View>
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 25,
                  letterSpacing: 0.5,
                  paddingLeft: 20,
                }}
              >
                {ev["date"].substring(0, 5) + " "}
                <Text
                  style={{
                    fontWeight: "300",
                    fontSize: 7,
                    letterSpacing: 0.5,
                  }}
                >
                  {ev["location"]}{" "}
                </Text>
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  marginLeft: 5,
                  paddingLeft: 30,
                  paddingTop: 5,
                }}
              >
                {ev["time"]}
              </Text>
            </View>
            <FontAwesome
              size={30}
              style={{ paddingTop: 10, marginRight: 30 }}
              name="calendar"
              color={Colors["text"]}
            />
          </Pressable>
        ))}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors["backgroundColor"],
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "30%",
  },
  appointment: {
    flex: 1,
  },
});
