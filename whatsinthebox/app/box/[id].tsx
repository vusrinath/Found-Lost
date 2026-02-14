import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  NavBar,
  Button,
  ItemRow,
} from '@/components';
import { useBoxContext } from '@/context/BoxContext';

export default function BoxDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getBoxById, getItemsByBoxId, getBoxItemQuantity } = useBoxContext();

  const box = id ? getBoxById(id) : undefined;
  const items = box ? getItemsByBoxId(box.id) : [];
  const itemCount = box ? getBoxItemQuantity(box.id) : 0;

  if (!box) {
    return (
      <View style={styles.container}>
        <NavBar
          title="Box"
          leftAction={{ label: '← Back', onPress: () => router.back() }}
        />
        <View style={styles.centered}>
          <Text>Box not found</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NavBar
        title={box.name}
        leftAction={{ label: '← Back', onPress: () => router.back() }}
        rightAction={{ label: '⋯', onPress: () => {} }}
      />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View>
              <Text style={styles.summaryLabel}>Location</Text>
              <Text style={styles.summaryValue}>📍 {box.location}</Text>
            </View>
            <View style={styles.summaryRight}>
              <Text style={styles.summaryLabel}>Items</Text>
              <Text style={styles.summaryValue}>{itemCount}</Text>
            </View>
          </View>
          <Button
            title="🔲 View QR Code"
            onPress={() => router.push(`/box/${box.id}/qr`)}
            variant="secondary"
            style={styles.qrButton}
          />
        </View>

        <View style={styles.itemsHeader}>
          <Text style={styles.itemsTitle}>Items in Box</Text>
          <TouchableOpacity onPress={() => router.push(`/box/${box.id}/add-item`)}>
            <Text style={styles.addIcon}>+</Text>
          </TouchableOpacity>
        </View>

        {items.map((item) => (
          <ItemRow
            key={item.id}
            item={item}
            onPress={() => router.push(`/box/${box.id}/item/${item.id}`)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  summaryCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  summaryRight: { alignItems: 'flex-end' },
  summaryLabel: { fontSize: 12, color: '#999', marginBottom: 4 },
  summaryValue: { fontSize: 16, fontWeight: '600', color: '#333' },
  qrButton: { marginTop: 12 },
  itemsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  itemsTitle: { fontSize: 18, fontWeight: '600', color: '#333' },
  addIcon: { fontSize: 24, color: '#667eea', fontWeight: '300' },
});
