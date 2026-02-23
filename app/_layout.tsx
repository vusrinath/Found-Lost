import 'react-native-get-random-values'; // Must be first - polyfill for crypto.getRandomValues (required by uuid)
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BoxProvider } from '@/context/BoxContext';
import * as Linking from 'expo-linking';
import { useEffect } from 'react';
import { LogBox } from 'react-native';

export default function RootLayout() {
  useEffect(() => {
    LogBox.ignoreLogs(["The action 'GO_BACK' was not handled by any navigator"]);
    
    const handleDeepLink = (event: { url: string }) => {
      const { path } = Linking.parse(event.url);
      console.log('Deep link:', path);
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);

    Linking.getInitialURL().then((url) => {
      if (url) {
        const { path } = Linking.parse(url);
        console.log('Initial URL:', path);
      }
    });

    return () => subscription.remove();
  }, []);

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
