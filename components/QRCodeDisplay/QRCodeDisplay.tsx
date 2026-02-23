import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { colors } from '@/theme/colors';

interface QRCodeDisplayProps {
  value: string;
  label: string;
  boxId: string;
  size?: number;
}

export function QRCodeDisplay({
  value,
  label,
  boxId,
  size = 200,
}: QRCodeDisplayProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.instruction}>
        Scan this code to view box contents
      </Text>
      <View style={[styles.qrWrapper, { width: size + 16, height: size + 16 }]}>
        <QRCode
          value={value}
          size={size}
          color={colors.text}
          backgroundColor={colors.white}
        />
      </View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.boxId}>Box ID: {boxId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  instruction: {
    fontSize: 16,
    color: colors.textMuted,
    marginBottom: 16,
    textAlign: 'center',
  },
  qrWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: colors.primary,
    borderRadius: 4,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 8,
  },
  boxId: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 5,
  },
});
