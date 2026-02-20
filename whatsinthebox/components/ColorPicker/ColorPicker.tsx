import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import type { BoxColor } from '@/types';
import { colors } from '@/theme/colors';

const COLORS: BoxColor[] = [
  '#E8F4FD',  // Light blue
  '#E6F7ED',  // Light mint
  '#FEF3E2',  // Light cream
  '#FCE8F0',  // Light blush
  '#F3E8FD',  // Light lavender
  '#F0F0F2',  // Light gray
];

interface ColorPickerProps {
  selected: BoxColor;
  onSelect: (color: BoxColor) => void;
}

export function ColorPicker({ selected, onSelect }: ColorPickerProps) {
  return (
    <View style={styles.container}>
      {COLORS.map((color) => (
        <TouchableOpacity
          key={color}
          style={[
            styles.swatch,
            { backgroundColor: color },
            selected === color && styles.selected,
          ]}
          onPress={() => onSelect(color)}
          activeOpacity={0.8}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 10,
    flexWrap: 'wrap',
  },
  swatch: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  selected: {
    borderWidth: 3,
    borderColor: colors.textMuted,
  },
});
