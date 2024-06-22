import { Stack } from 'expo-router/stack';

export default function AppLayout() {
  return (
    <Stack>

      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen name="index" options={{headerShown:false}} />
      <Stack.Screen name='slideshow' options={{headerShown:false}} />
      <Stack.Screen name="loadingScreen" options={{headerShown:false}} />
      <Stack.Screen name="login" options={{headerShown:false}} />
      <Stack.Screen name="register" options={{headerShown:false}} />
    </Stack>
  );
}
