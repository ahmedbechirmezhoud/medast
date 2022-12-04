import { View, Text, StyleSheet } from "react-native";

export default function PrescriptionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>No prescription available</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
