import React from 'react';
import { View, Text, StyleSheet, StatusBar as RNStatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/theme/colors';

interface StatusBarProps {
  backgroundColor?: string;
}

export function StatusBar({ backgroundColor = colors.backgroundSecondary }: StatusBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <>
      <RNStatusBar barStyle="dark-content" backgroundColor={backgroundColor} />
      <View style={[styles.container, { paddingTop: insets.top, backgroundColor }]}>
        <Text style={styles.time}>9:41</Text>
        <Text style={styles.icons}>📶 📡 🔋</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  time: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  icons: {
    fontSize: 12,
    color: colors.text,
  },
});
