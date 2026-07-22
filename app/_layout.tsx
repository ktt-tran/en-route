import { Stack } from "expo-router";
import "../src/styles/index.css";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}