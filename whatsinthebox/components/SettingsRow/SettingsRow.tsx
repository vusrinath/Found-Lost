import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from 'react-native';
import { colors } from '@/theme/colors';

interface SettingsRowProps {
  icon?: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showArrow?: boolean;
  rightText?: string;
  /** For toggle rows */
  value?: boolean;
  onValueChange?: (value: boolean) => void;
}

export function SettingsRow({
  icon,
  title,
  subtitle,
  onPress,
  showArrow = true,
  rightText,
  value,
  onValueChange,
}: SettingsRowProps) {
  const isToggle = typeof value === 'boolean' && onValueChange;
  const isPressable = onPress && !isToggle;

  const content = (
    <>
      <View style={styles.left}>
        {icon ? <Text style={styles.icon}>{icon}</Text> : null}
        <View>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? (
            <Text style={styles.subtitle}>{subtitle}</Text>
          ) : null}
        </View>
      </View>
      <View style={styles.right}>
        {rightText ? (
          <Text style={styles.rightText}>{rightText}</Text>
        ) : null}
        {isToggle ? (
          <Switch
            value={value}
            onValueChange={onValueChange}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.white}
          />
        ) : showArrow && isPressable ? (
          <Text style={styles.arrow}>→</Text>
        ) : null}
      </View>
    </>
  );

  if (isPressable) {
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={styles.row}>{content}</View>;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
    marginBottom: 10,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 18,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    color: colors.text,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 3,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rightText: {
    fontSize: 14,
    color: colors.primary,
  },
  arrow: {
    fontSize: 16,
    color: colors.primary,
  },
});
