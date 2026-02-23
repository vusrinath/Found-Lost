import { Redirect } from 'expo-router';

/**
 * Root index - redirects to the main BoxTrack app (tabs/home)
 */
export default function Index() {
  return <Redirect href="/(tabs)" />;
}
