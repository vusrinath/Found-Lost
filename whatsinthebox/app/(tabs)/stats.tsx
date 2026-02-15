import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { NavBar, StatsCard, TabBar } from '@/components';
import { useBoxContext } from '@/context/BoxContext';
import type { TabId } from '@/components/TabBar';

export default function StatsScreen() {
  const router = useRouter();
  const { boxes, getTotalItemCount, getBoxItemQuantity } = useBoxContext();

  const totalItems = getTotalItemCount();
  const totalBoxes = boxes.length;

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
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📊</Text>
            <Text style={styles.emptyTitle}>No Stats Yet</Text>
            <Text style={styles.emptySubtitle}>Create your first box to see statistics</Text>
          </View>
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
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
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
