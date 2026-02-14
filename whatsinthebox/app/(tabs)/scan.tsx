import React from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';

// This tab redirects to scan modal - actual scanner is in scan-modal.tsx
export default function ScanTab() {
  const router = useRouter();
  React.useEffect(() => {
    router.replace('/scan-modal');
  }, [router]);
  return <View />;
}
