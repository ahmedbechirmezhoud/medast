// @ts-nocheck
import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../Colors";

export default function NotificationsScreen() {
  Notifications = [
    {
      id: 1,
      title: "Appointment",
      message: "Your appointment is scheduled for 10:00 AM",
      date: "10/10/2021",
      time: "10:00 AM",
    },
    {
      id: 2,
      title: "Prescription",
      message: "Your prescription is ready",
      date: "10/10/2021",
      time: "10:00 AM",
    },
  ];
  return (
    <View style={styles.container}>
      <ScrollView style={styles.warpper}>
        {Notifications ? (
          Notifications.map((notif, idx) => (
            <TouchableOpacity key={idx} style={styles.notification}>
              <Text style={styles.title}> {notif.title} </Text>
              <Text style={styles.message}>{notif.message}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text
            style={{ fontWeight: "bold", marginTop: 50, color: Colors["text"] }}
          >
            No Notification Found
          </Text>
        )}
      </ScrollView>

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors["backgroundColor"],
  },
  warpper: {
    marginTop: 130,
  },
  notification: {
    backgroundColor: Colors["gray"],
    width: Dimensions.get("window").width,
    marginVertical: 2,
    paddingVertical: 10,
    paddingHorizontal: 13,
  },
  title: {
    fontSize: 15,
  },
  message: {
    fontSize: 10,
  },
});
