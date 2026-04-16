import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Remove a barra branca
      }}
    />
  );
}

export const unstable_settings = {
  initialRouteName: "Login",
};
