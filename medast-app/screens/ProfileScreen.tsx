// @ts-nocheck
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { deleteUser, getAuth, signOut } from "firebase/auth";
import CustomButton from "../components/CustomButton";
import Colors from "../Colors";
import { FontAwesome } from "@expo/vector-icons";

export default function ProfileScreen({ navigation }) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <View style={styles.profileImage}>
            <Image
              style={{ width: 100, height: 100, borderRadius: 100 }}
              source={{
                uri: "https://scontent.ftun1-2.fna.fbcdn.net/v/t39.30808-6/310904884_2128656057329222_8715117308046572879_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Ie7iJ0NibocAX936mg4&tn=V1XG6fZK5Wtxdvx1&_nc_ht=scontent.ftun1-2.fna&oh=00_AfCMYTo6Hw9umj5BTLF6RVNEjHJkHrdMAq6k1rb4lVjy6g&oe=63912FA3",
              }}
            />
            <Text style={{ fontSize: 17, marginLeft: 12, fontWeight: "bold" }}>
              Ahmed Bechir {"\n"} Mezhoud {"\n"}
              <Text style={{ fontSize: 10, marginLeft: 15, fontWeight: "300" }}>
                Paired with Doctor Sharmoul
              </Text>
            </Text>
          </View>
          <View style={styles.currentUser}>
            <Text style={styles.welcome}>DEVICES</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("device");
                }}
              >
                <FontAwesome
                  size={30}
                  style={{
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
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome
                  size={30}
                  style={{
                    marginBottom: -3,
                    paddingTop: 15,
                    paddingLeft: 20,
                    paddingRight: 20,
                    padding: 10,
                    borderRadius: 100,
                    borderColor: Colors["primaryColor"],
                    borderWidth: 3,
                    width: 65,
                    alignItems: "center",
                    justifyContent: "center",
                    margin: 5,
                  }}
                  name="plus"
                  color={Colors["primaryColor"]}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.changeIDSection}>
            <CustomButton
              onPress={() => {
                Alert.alert(
                  "Delete Account Permanently",
                  "Are you sure you want to delete your account ?",
                  [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "Delete",
                      onPress: () => {
                        deleteUser(getAuth().currentUser).then(() => {
                          dispatch({ type: Types.LOGOUT, payload: {} });
                        });
                      },
                    },
                  ]
                );
              }}
              style={{ marginTop: 10 }}
              title="Delete Account"
              color={Colors["backgroundColor"]}
              bgColor={Colors["text"]}
            />
            <CustomButton
              onPress={async () => {
                await GoogleSignIn.signOutAsync();
                await signOut(getAuth());
                dispatch({ type: Types.LOGOUT, payload: {} });
              }}
              style={{ marginTop: 10 }}
              title="Sign Out"
              color={Colors["backgroundColor"]}
              bgColor={Colors["danger"]}
            />
          </View>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profileImage: {
    marginTop: "30%",
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-around",
  },
  currentUser: {
    marginTop: 40,
    width: "90%",
    textAlign: "left",
    paddingLeft: 30,
    // paddingRight: 30
  },
  welcome: {
    color: Colors["primaryColor"],
    fontWeight: "bold",
    fontSize: 20,
    textTransform: "uppercase",
  },
  changeIDSection: {
    marginTop: 80,
    width: "100%",
    paddingLeft: 60,
    paddingRight: 60,
  },
  inputArea: {
    width: "100%",
    backgroundColor: "#FEF8EE",
    marginTop: 10,
    paddingLeft: 10,
    borderRadius: 5,
    height: 35,
    borderColor: Colors["tintColorLight"],
    borderWidth: 2,
  },
  currentIDContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 3,
  },
  currentIDTitle: {
    color: Colors["tintColorLight"],
  },
  currentID: {
    color: Colors["tintColorLight"],
    fontWeight: "bold",
    fontStyle: "italic",
  },
  customizeExp: {
    fontSize: 13.5,
    marginTop: 3,
    color: Colors["text"],
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#525252",
  },
  buttonContainer: {
    marginLeft: "20%",
    marginRight: "20%",
    width: "100%",
    marginTop: 10,
  },
});
