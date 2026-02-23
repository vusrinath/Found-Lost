import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { colors } from '@/theme/colors';

interface FormInputProps extends TextInputProps {
  label: string;
  required?: boolean;
  helperText?: string;
}

export function FormInput({
  label,
  required = false,
  helperText,
  style,
  ...rest
}: FormInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label} {required && '*'}
      </Text>
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={colors.textMuted}
        {...rest}
      />
      {helperText ? (
        <Text style={styles.helper}>{helperText}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 8,
    fontSize: 16,
    color: colors.text,
  },
  helper: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 5,
  },
});
