import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { NavBar, StatsCard, TabBar } from '@/components';
import { useBoxContext } from '@/context/BoxContext';
import type { TabId } from '@/components/TabBar';

export default function StatsScreen() {
  const router = useRouter();
  const { boxes, getTotalItemCount, getBoxItemQuantity } = useBoxContext();
  const { width } = useWindowDimensions();
  const catPosition = useRef(new Animated.Value(-50)).current;
  const box1Y = useRef(new Animated.Value(-100)).current;
  const box2Y = useRef(new Animated.Value(-100)).current;
  const box3Y = useRef(new Animated.Value(-100)).current;

  const totalItems = getTotalItemCount();
  const totalBoxes = boxes.length;

  useEffect(() => {
    if (boxes.length === 0) {
      const runCat = () => {
        catPosition.setValue(-50);
        Animated.timing(catPosition, {
          toValue: width + 50,
          duration: 3000,
          useNativeDriver: true,
        }).start(() => {
          setTimeout(runCat, 2000);
        });
      };
      runCat();

      const stackBoxes = () => {
        box1Y.setValue(-100);
        box2Y.setValue(-100);
        box3Y.setValue(-100);
        
        Animated.sequence([
          Animated.timing(box1Y, { toValue: 0, duration: 400, useNativeDriver: true }),
          Animated.timing(box2Y, { toValue: 0, duration: 400, useNativeDriver: true }),
          Animated.timing(box3Y, { toValue: 0, duration: 400, useNativeDriver: true }),
          Animated.delay(1000),
          Animated.parallel([
            Animated.timing(box1Y, { toValue: 300, duration: 600, useNativeDriver: true }),
            Animated.timing(box2Y, { toValue: 300, duration: 600, useNativeDriver: true }),
            Animated.timing(box3Y, { toValue: 300, duration: 600, useNativeDriver: true }),
          ]),
        ]).start(() => {
          setTimeout(stackBoxes, 1500);
        });
      };
      stackBoxes();
    }
  }, [boxes.length, catPosition, width, box1Y, box2Y, box3Y]);

  return (
    <View style={styles.container}>
      <NavBar
        title="Stats"
        leftAction={{ label: '← Back', onPress: () => router.canGoBack() ? router.back() : router.replace('/(tabs)') }}
      />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <View style={styles.statsGrid}>
          <StatsCard value={totalBoxes} label="Total Boxes" />
          <View style={styles.spacer} />
          <StatsCard value={totalItems} label="Total Items" />
        </View>
        {boxes.length === 0 ? (
          <>
            <View style={styles.emptyContainer}>
              <View style={styles.boxStack}>
                <Animated.Text style={[styles.stackBox, { transform: [{ translateY: box1Y }] }]}>
                  📦
                </Animated.Text>
                <Animated.Text style={[styles.stackBox, { transform: [{ translateY: box2Y }] }]}>
                  📦
                </Animated.Text>
                <Animated.Text style={[styles.stackBox, { transform: [{ translateY: box3Y }] }]}>
                  📦
                </Animated.Text>
              </View>
              <Text style={styles.emptyTitle}>No Stats Yet</Text>
              <Text style={styles.emptySubtitle}>Create your first box to see statistics</Text>
            </View>
            <Animated.Text style={[styles.cat, { transform: [{ translateX: catPosition }] }]}>
              🐈
            </Animated.Text>
          </>
        ) : (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Boxes Overview</Text>
            {boxes.map((box) => (
              <View key={box.id} style={styles.boxRow}>
                <Text style={styles.boxName}>{box.name}</Text>
                <Text style={styles.boxCount}>
                  {getBoxItemQuantity(box.id)} items
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      <TabBar activeTab="stats" onTabChange={(tab) => {
        if (tab === 'boxes') router.replace('/(tabs)');
        else if (tab === 'scan') router.push('/scan-modal');
        else if (tab === 'profile') router.push('/(tabs)/profile');
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 100 },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  spacer: { width: 12 },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  boxStack: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  stackBox: {
    fontSize: 50,
    position: 'absolute',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999',
  },
  cat: {
    position: 'absolute',
    bottom: 120,
    fontSize: 40,
  },
  section: { marginTop: 8 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  boxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  boxName: { fontSize: 15, color: '#333' },
  boxCount: { fontSize: 14, color: '#999' },
});
