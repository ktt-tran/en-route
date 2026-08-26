import "@/src/styles/index.css";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { initializeDatabase } from "../features/record/trip.database";

const queryClient = new QueryClient();

export default function RootLayout() {

  useEffect(() => {
    initializeDatabase()
        .then(() => {
            console.log("[Database] Initialized");
        })
        .catch((error) => {
            console.error(
                "[Database] Initialization failed:",
                error
            );
        });
  }, []);

  return (
    <GestureHandlerRootView className="flex-1">
      <QueryClientProvider client={queryClient}>
        <BottomSheetModalProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              gestureEnabled: false,
            }}
          >
            <Stack.Screen name="index" options={{ animation: 'slide_from_left' }} />

            <Stack.Screen name="history" options={{ animation: 'slide_from_right' }} />

            <Stack.Screen
              name="search"
              options={{
                presentation: "modal",
                animation: 'slide_from_right',
              }}
            />

            <Stack.Screen
              name="route"
              options={{
                presentation: "modal",
                headerShown: false,
                animation: "slide_from_bottom",
              }}
            />
          </Stack>
        </BottomSheetModalProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}