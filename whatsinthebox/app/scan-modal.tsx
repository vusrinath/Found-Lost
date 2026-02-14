import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { QRScanner } from '@/components';
import { useBoxContext } from '@/context/BoxContext';

export default function ScanModalScreen() {
  const router = useRouter();
  const { getBoxByQrId } = useBoxContext();

  const handleScan = (data: string) => {
    const box = getBoxByQrId(data);
    if (box) {
      router.replace(`/box/${box.id}`);
    } else {
      router.back();
    }
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <QRScanner onScan={handleScan} onClose={handleClose} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
