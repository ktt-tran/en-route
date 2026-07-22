import { Stack } from "expo-router";
import "../src/styles/index.css";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="(tabs)"
        options={{
          headerShown:false
        }}
      />
    </Stack>
  );
}