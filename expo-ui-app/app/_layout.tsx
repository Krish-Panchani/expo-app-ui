import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Appearance, Platform } from 'react-native';
import 'react-native-reanimated';

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS !== 'web') {
      Appearance.setColorScheme('light');
    }
  }, []);

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#fafafa' },
          headerTintColor: '#0a0a0a',
          headerTitleStyle: { fontWeight: '600', fontSize: 17, color: '#0a0a0a' },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: '#fafafa' },
        }}>
        <Stack.Screen name="index" options={{ title: 'Expo Apps UI' }} />
        <Stack.Screen name="showcase" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}
