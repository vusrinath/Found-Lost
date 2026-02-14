import 'react-native-get-random-values'; // Must be first - polyfill for crypto.getRandomValues (required by uuid)
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BoxProvider } from '@/context/BoxContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <BoxProvider>
        <StatusBar style="dark" />
        <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#fff' },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="create-box" />
        <Stack.Screen name="search" />
        <Stack.Screen name="box/[id]" />
        <Stack.Screen name="box/[id]/edit" />
        <Stack.Screen name="box/[id]/qr" />
        <Stack.Screen name="box/[id]/add-item" />
        <Stack.Screen name="box/[id]/item/[itemId]" />
        <Stack.Screen name="scan-modal" options={{ presentation: 'modal' }} />
      </Stack>
      </BoxProvider>
    </SafeAreaProvider>
  );
}
