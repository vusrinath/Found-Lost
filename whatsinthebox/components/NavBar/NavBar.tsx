import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={[styles.side, styles.sideLeft]}>
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
      <View style={[styles.side, styles.sideRight]}>
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
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  side: {
    minWidth: 80,
    justifyContent: 'center',
  },
  sideLeft: {
    alignItems: 'flex-start',
  },
  sideRight: {
    alignItems: 'flex-end',
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
    fontWeight: '600',
    color: colors.primary,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
});
