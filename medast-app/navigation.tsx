import React, { useState, useEffect } from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Colors from "./Colors";
import { FontAwesome } from "@expo/vector-icons";
import PrescriptionScreen from "./screens/PrescriptionScreen";
import AppointmentScreen from "./screens/AppointmentScreen";
import ProfileScreen from "./screens/ProfileScreen";
import NotificationScreen from "./screens/NotificationScreen";
import { getDoc, doc, getFirestore } from "firebase/firestore";
import DeviceScreen from "./screens/DeviceScreen";

export default function Navigation() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (user) {
      getDoc(doc(getFirestore(), "patients", "aJyRW4NUKcNylstCXZWe")).then(
        (doc) => {
          if (doc.exists()) setUser(doc.data());
          setAppIsReady(true);
        }
      );
    } else if (user !== undefined) {
      setAppIsReady(true);
    }
  }, [user]);

  if (!appIsReady)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors["backgroundColor"],
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 10,
        }}
      >
        <ActivityIndicator size="large" color={Colors["primaryColor"]} />
      </View>
    );
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Group
        screenOptions={{
          presentation: "modal",
          headerBackVisible: true,
          headerTransparent: true,
          headerShadowVisible: false,
          headerTintColor: Colors["primaryColor"],
          headerTitleStyle: {
            color: Colors["primaryColor"],
            //fontFamily: "futura",
            fontSize: 25,
          },
        }}
      >
        <Stack.Screen
          name="Notifications"
          component={NotificationScreen}
          options={{ animation: "fade_from_bottom" }}
        />
        <Stack.Screen
          name="device"
          component={DeviceScreen}
          options={{ animation: "fade_from_bottom" }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="appointment"
      screenOptions={{
        tabBarActiveTintColor: Colors["backgroundColor"],
        tabBarInactiveTintColor: Colors["primaryColor"],
        tabBarActiveBackgroundColor: Colors["primaryColor"],
        tabBarInactiveBackgroundColor: Colors["backgroundColor"],
        tabBarShowLabel: false,
        headerTitleStyle: {
          color: Colors["primaryColor"],
          textTransform: "uppercase",
          letterSpacing: 1,
        },
        headerTransparent: true,
        headerShadowVisible: false,
      }}
    >
      <BottomTab.Screen
        name="prescription"
        component={PrescriptionScreen}
        options={({ navigation }) => ({
          title: "Prescription",
          tabBarIcon: ({ color }) => <TabBarIcon name="medkit" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Notifications")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="bell"
                size={25}
                color={Colors["primaryColor"]}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="appointment"
        component={AppointmentScreen}
        options={({ navigation }) => ({
          title: "Appointments",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calendar" color={color} />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Notifications")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="bell"
                size={25}
                color={Colors["primaryColor"]}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Notifications")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="bell"
                size={25}
                color={Colors["primaryColor"]}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
