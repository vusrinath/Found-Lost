import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { NavBar, QRCodeDisplay, Button } from '@/components';
import { useBoxContext } from '@/context/BoxContext';

export default function BoxQRScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getBoxById } = useBoxContext();

  const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : undefined;
  const box = id ? getBoxById(id) : undefined;

  const handleShare = () => {
    // TODO: Implement share functionality
  };

  const handlePrint = () => {
    // TODO: Implement print functionality
  };

  const handleShareInfo = () => {
    // TODO: Implement share box info functionality
  };

  if (!box) {
    return (
      <View style={styles.container}>
        <NavBar
          title="QR Code"
          leftAction={{ label: '← Back', onPress: () => router.back() }}
        />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Box not found</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NavBar
        title="QR Code"
        leftAction={{ label: '← Back', onPress: () => router.back() }}
        rightAction={{ label: 'Share', onPress: handleShare }}
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
      >
        <QRCodeDisplay
          value={box.qrCodeId}
          label={box.name}
          boxId={box.qrCodeId}
          size={220}
        />
        <Button
          title="🖨️ Print QR Code"
          onPress={handlePrint}
          style={styles.button}
        />
        <Button
          title="📤 Share Box Info"
          onPress={handleShareInfo}
          variant="secondary"
        />
        <View style={styles.options}>
          <Text style={styles.optionsTitle}>Print Options</Text>
          <View style={styles.optionsList}>
            <Text style={styles.option}>• Small (2"x2") - Label size</Text>
            <Text style={styles.option}>• Medium (4"x4") - Box top</Text>
            <Text style={styles.option}>• Large (6"x6") - Wall mount</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  button: { marginTop: 32 },
  options: {
    marginTop: 32,
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  optionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },
  optionsList: {},
  option: { fontSize: 13, color: '#666', lineHeight: 22 },
});
