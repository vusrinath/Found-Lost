import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/theme/colors';

export type TabId = 'boxes' | 'scan' | 'stats' | 'profile';

interface TabItem {
  id: TabId;
  icon: string | React.ReactNode;
  label: string;
}

const TABS: TabItem[] = [
  { id: 'boxes', icon: <Image source={require('@/assets/images/box.png')} style={{ width: 45, height: 30 }} />, label: 'Boxes' },
  { id: 'scan', icon: <Image source={require('@/assets/images/scan.png')} style={{ width: 50, height: 30 }} />, label: 'Scan' },
  { id: 'stats', icon: <Image source={require('@/assets/images/stats.png')} style={{ width: 50, height: 30 }} />, label: 'Stats' },
  { id: 'profile', icon: <Image source={require('@/assets/images/profile.png')} style={{ width: 50, height: 40 }} />, label: 'Profile' },
];

interface TabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom || 10 }]}>
      {TABS.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={styles.tab}
          onPress={() => onTabChange(tab.id)}
          activeOpacity={0.7}
        >
          {typeof tab.icon === 'string' ? (
            <Text
              style={[
                styles.icon,
                activeTab === tab.id && styles.iconActive,
              ]}
            >
              {tab.icon}
            </Text>
          ) : (
            <View style={[styles.iconContainer, activeTab === tab.id && styles.iconActive]}>
              {tab.icon}
            </View>
          )}
          <Text
            style={[
              styles.label,
              activeTab === tab.id && styles.labelActive,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 100,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  icon: {
    fontSize: 30,
    color: colors.textMuted,
  },
  iconContainer: {
    opacity: 0.5,
  },
  iconActive: {
    color: colors.primary,
    opacity: 1,
  },
  label: {
    fontSize: 11,
    color: colors.textMuted,
  },
  labelActive: {
    color: colors.primary,
    fontWeight: '600',
  },
});
