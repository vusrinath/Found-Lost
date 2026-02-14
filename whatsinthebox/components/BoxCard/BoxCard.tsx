import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import type { Box } from '@/types';

const LIGHT_BOX_COLORS = [
  '#E8F4FD', '#E6F7ED', '#FEF3E2', '#FCE8F0', '#F3E8FD', '#F0F0F2',
] as const;

function getBoxBackgroundColor(boxColor: string): string {
  return LIGHT_BOX_COLORS.includes(boxColor as typeof LIGHT_BOX_COLORS[number])
    ? boxColor
    : '#F0F0F2'; // Fallback for legacy colors
}

interface BoxCardProps {
  box: Box;
  itemCount: number;
  onPress: () => void;
}

export function BoxCard({ box, itemCount, onPress }: BoxCardProps) {
  const displayName = box.name;
  const itemLabel = itemCount === 1 ? '1 item' : `${itemCount} items`;

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: getBoxBackgroundColor(box.color) }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={styles.name} numberOfLines={1}>
          {displayName}
        </Text>
        <Text style={styles.count}>{itemLabel}</Text>
      </View>
      <Text style={styles.location} numberOfLines={1}>
        📍 {box.location}
      </Text>
      <View style={styles.tagContainer}>
        <View style={[styles.tag, { backgroundColor: colors.white }]}>
          <Text style={styles.tagText}>{box.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  count: {
    fontSize: 14,
    color: colors.textMuted,
    marginLeft: 8,
  },
  location: {
    fontSize: 14,
    color: colors.primary,
    marginTop: 4,
  },
  tagContainer: {
    marginTop: 8,
  },
  tag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    opacity: 0.95,
  },
  tagText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
