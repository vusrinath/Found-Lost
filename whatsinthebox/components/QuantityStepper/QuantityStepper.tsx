import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { colors } from '@/theme/colors';

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  unit?: string;
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 999,
  unit,
}: QuantityStepperProps) {
  const handleIncrement = () => {
    if (value < max) onChange(value + 1);
  };

  const handleDecrement = () => {
    if (value > min) onChange(value - 1);
  };

  const handleTextChange = (text: string) => {
    const num = parseInt(text, 10);
    if (!isNaN(num) && num >= min && num <= max) {
      onChange(num);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.decrement}
        onPress={handleDecrement}
        disabled={value <= min}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.buttonText,
            value <= min && styles.buttonDisabled,
          ]}
        >
          −
        </Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        value={String(value)}
        onChangeText={handleTextChange}
        keyboardType="number-pad"
        selectTextOnFocus
      />
      <TouchableOpacity
        style={[styles.increment, styles.incrementActive]}
        onPress={handleIncrement}
        disabled={value >= max}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.buttonText,
            styles.buttonTextLight,
            value >= max && styles.buttonDisabled,
          ]}
        >
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  decrement: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 10,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  increment: {
    width: 50,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  incrementActive: {
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  input: {
    width: 80,
    padding: 12,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 8,
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: colors.text,
    fontWeight: '500',
  },
  buttonTextLight: {
    color: colors.white,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
});
