import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import type { BoxCategory } from '@/types';

const CATEGORIES: BoxCategory[] = [
  'Kitchen',
  'Seasonal',
  'Clothing',
  'Tools',
  'Books',
  'Toys',
  'Other',
];

interface CategoryChipsProps {
  selected: BoxCategory;
  onSelect: (category: BoxCategory) => void;
}

export function CategoryChips({ selected, onSelect }: CategoryChipsProps) {
  return (
    <View style={styles.container}>
      {CATEGORIES.map((cat) => (
        <TouchableOpacity
          key={cat}
          style={[
            styles.chip,
            selected === cat && styles.chipSelected,
          ]}
          onPress={() => onSelect(cat)}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.chipText,
              selected === cat && styles.chipTextSelected,
            ]}
          >
            {cat}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 12,
  },
  chipSelected: {
    backgroundColor: colors.primary,
  },
  chipText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  chipTextSelected: {
    color: colors.white,
    fontWeight: '600',
  },
});
