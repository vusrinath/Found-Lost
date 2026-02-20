import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { colors } from '@/theme/colors';

interface EmptyStateProps {
  icon?: string | React.ReactNode;
  title: string;
  subtitle?: string;
}

export function EmptyState({
  icon = '📦',
  title,
  subtitle,
}: EmptyStateProps) {
  const boxScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const breatheAnimation = () => {
      Animated.sequence([
        Animated.timing(boxScale, { toValue: 1.2, duration: 1000, useNativeDriver: true }),
        Animated.timing(boxScale, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ]).start(() => breatheAnimation());
    };
    breatheAnimation();
  }, [boxScale]);
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animationContainer, { transform: [{ scale: boxScale }] }]}>
        {typeof icon === 'string' ? (
          <Text style={styles.icon}>{icon}</Text>
        ) : (
          <View style={styles.iconContainer}>{icon}</View>
        )}
      </Animated.View>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? (
        <Text style={styles.subtitle}>{subtitle}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  animationContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    fontSize: 80,
  },
  iconContainer: {},
  title: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
