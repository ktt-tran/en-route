import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../src/styles/index.css";

export default function RootLayout() {
  return (
    <GestureHandlerRootView className="flex-1">
      <BottomSheetModalProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />

          <Stack.Screen name="history" />

          <Stack.Screen
            name="search"
            options={{
              presentation: "modal",
            }}
          />

          <Stack.Screen
            name="route"
            options={{
              presentation: "modal",
            }}
          />
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}