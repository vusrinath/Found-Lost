import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import type { BoxColor } from '@/types';
import { colors } from '@/theme/colors';

const COLORS: BoxColor[] = [
  '#667eea',
  '#f093fb',
  '#4facfe',
  '#43e97b',
  '#fa709a',
  '#ffa726',
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
    borderColor: colors.text,
  },
});
