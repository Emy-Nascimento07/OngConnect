import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Platform } from "react-native";
import { RootStackParamList, TabParamList } from "./types/navigation";

import Login from "../app/screens/LoginScreen";
import Dashboard from "./screens/DashboardScreen";
import DetalhesOng from "./screens/DetalhesOngScreen";
import Explorar from "./screens/ExplorarScreen";
import Usuário from "./screens/UsuarioScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator({ route }: any) {
  // Captura os parâmetros vindos do Login
  const userName = route?.params?.userName || "Visitante";
  const voluntarioId = route?.params?.voluntarioId || "";

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { height: Platform.OS === "ios" ? 100 : 80 },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        initialParams={{ userName, voluntarioId }}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home"
              size={24}
              color={focused ? "#48a165" : "#82c699"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Explorar"
        component={Explorar}
        initialParams={{ userName, voluntarioId }}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="search"
              size={24}
              color={focused ? "#48a165" : "#82c699"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Usuário"
        component={Usuário}
        initialParams={{ userName, voluntarioId }}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person"
              size={24}
              color={focused ? "#48a165" : "#82c699"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen
        name="OngDetalhes"
        component={DetalhesOng}
        options={{
          headerShown: true,
          headerTitle: "Detalhes da ONG",
          headerStyle: { backgroundColor: "#F5FDF8" },
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
