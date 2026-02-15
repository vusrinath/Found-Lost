import React, { useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, Share, Clipboard, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Linking from 'expo-linking';
import * as MediaLibrary from 'expo-media-library';
import * as Print from 'expo-print';
import { captureRef } from 'react-native-view-shot';
import { NavBar, QRCodeDisplay, Button } from '@/components';
import { useBoxContext } from '@/context/BoxContext';

export default function BoxQRScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getBoxById } = useBoxContext();
  const qrRef = useRef<View>(null);

  const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : undefined;
  const box = id ? getBoxById(id) : undefined;

  const deepLink = box ? Linking.createURL(`/box/${box.id}`) : '';

  const handlePrintQR = async () => {
    if (!box || !qrRef.current) return;
    try {
      const uri = await captureRef(qrRef, {
        format: 'png',
        quality: 1,
      });
      
      const html = `
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
              @page { margin: 0.5in; size: auto; }
              body { 
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 20px;
              }
              h1 { font-size: 24px; margin-bottom: 20px; }
              img { width: 300px; height: 300px; }
            </style>
          </head>
          <body>
            <h1>${box.name}</h1>
            <img src="${uri}" />
            <p>Box ID: ${box.qrCodeId}</p>
          </body>
        </html>
      `;
      
      await Print.printAsync({ html });
    } catch (error) {
      Alert.alert('Error', 'Failed to print QR code');
    }
  };

  const handleShareQR = async () => {
    if (!box || !qrRef.current) return;
    try {
      const uri = await captureRef(qrRef, {
        format: 'png',
        quality: 1,
      });
      
      if (Platform.OS === 'android') {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status === 'granted') {
          await MediaLibrary.saveToLibraryAsync(uri);
          Alert.alert('Success', 'QR code saved to gallery');
        }
      } else {
        await Share.share({
          url: uri,
          message: `${box.name} QR Code`,
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to share QR code. Make sure you have a development build.');
    }
  };

  const handleShare = async () => {
    if (!box) return;
    try {
      await Share.share({
        message: `${box.name}\n\nScan this QR code or use this link:\n${deepLink}\n\nBox ID: ${box.qrCodeId}\nLocation: ${box.location}`,
        title: `Share ${box.name}`,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share');
    }
  };

  const handleCopyLink = async () => {
    if (!box) return;
    try {
      await Clipboard.setString(deepLink);
      Alert.alert('Copied!', 'Deep link copied to clipboard');
    } catch (error) {
      Alert.alert('Error', 'Failed to copy link');
    }
  };

  const handleShareInfo = async () => {
    if (!box) return;
    try {
      await Share.share({
        message: `Box: ${box.name}\nLocation: ${box.location}\nID: ${box.qrCodeId}\nLink: ${deepLink}`,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share box info');
    }
  };

  if (!box) {
    return (
      <View style={styles.container}>
        <NavBar
          title="QR Code"
          leftAction={{ label: '← Back', onPress: () => router.canGoBack() ? router.back() : router.replace('/(tabs)') }}
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
        leftAction={{ label: '← Back', onPress: () => router.canGoBack() ? router.back() : router.replace('/(tabs)') }}
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
      >
        <View ref={qrRef} collapsable={false} style={styles.qrContainer}>
          <QRCodeDisplay
            value={deepLink}
            label={box.name}
            boxId={box.qrCodeId}
            size={220}
          />
        </View>
        <Button
          title="📷 Share QR as Image"
          onPress={handleShareQR}
          style={styles.button}
        />
        <Button
          title="🖨️ Print QR Code"
          onPress={handlePrintQR}
          variant="secondary"
          style={styles.button}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  qrContainer: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  button: { marginTop: 16 },
  infoBox: {
    marginTop: 32,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  infoText: {
    fontSize: 12,
    color: '#666',
  },
  secondbutton: {
    marginBottom: 10,
  },
});
