import React, { useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, Share, Clipboard, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Linking from 'expo-linking';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
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
          title="🔗 Copy Deep Link"
          onPress={handleCopyLink}
          variant="secondary"
          style={styles.button}
        />
        <Button
          title="📋 Share Box Details"
          onPress={handleShareInfo}
          variant="secondary"
        />
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Deep Link</Text>
          <Text style={styles.infoText} numberOfLines={2}>{deepLink}</Text>
        </View>
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
