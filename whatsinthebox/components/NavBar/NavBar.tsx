import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

interface NavBarProps {
  title: string;
  leftAction?: {
    label: string;
    onPress: () => void;
  };
  rightAction?: {
    label: string;
    onPress: () => void;
  };
  rightDisabled?: boolean;
}

export function NavBar({
  title,
  leftAction,
  rightAction,
  rightDisabled = false,
}: NavBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.side}>
        {leftAction ? (
          <TouchableOpacity onPress={leftAction.onPress} activeOpacity={0.7}>
            <Text style={styles.button}>{leftAction.label}</Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.side}>
        {rightAction ? (
          <TouchableOpacity
            onPress={rightAction.onPress}
            activeOpacity={0.7}
            disabled={rightDisabled}
          >
            <Text
              style={[
                styles.button,
                rightDisabled && styles.buttonDisabled,
              ]}
            >
              {rightAction.label}
            </Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  side: {
    minWidth: 80,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  button: {
    fontSize: 16,
    color: colors.primary,
  },
  buttonDisabled: {
    opacity: 0.3,
  },
});
