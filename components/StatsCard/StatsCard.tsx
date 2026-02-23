import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

interface StatsCardProps {
  value: number | string;
  label: string;
}

export function StatsCard({ value, label }: StatsCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.gradient}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 100,
  },
  gradient: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.95,
  },
});
