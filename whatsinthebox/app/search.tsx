import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { NavBar, SearchBar, BoxCard, ItemRow, TabBar } from '@/components';
import { useBoxContext } from '@/context/BoxContext';

export default function SearchScreen() {
  const { q } = useLocalSearchParams<{ q?: string }>();
  const router = useRouter();
  const { search, getBoxItemQuantity, getBoxById } = useBoxContext();
  const [query, setQuery] = useState(q || '');

  useEffect(() => {
    if (q) setQuery(q);
  }, [q]);

  const { boxes, items } = search(query);

  return (
    <View style={styles.container}>
      <NavBar
        title="Search"
        leftAction={{ label: '← Back', onPress: () => router.back() }}
      />
      <SearchBar
        value={query}
        onChangeText={setQuery}
        placeholder="Search boxes or items..."
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.resultCount}>
          Found {boxes.length + items.length} results for "{query}"
        </Text>

        {boxes.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Boxes ({boxes.length})</Text>
            {boxes.map((box) => (
              <BoxCard
                key={box.id}
                box={box}
                itemCount={getBoxItemQuantity(box.id)}
                onPress={() => router.push(`/box/${box.id}`)}
              />
            ))}
          </>
        )}

        {items.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, styles.sectionTitleItems]}>
              Items ({items.length})
            </Text>
            {items.map((item) => {
              const box = getBoxById(item.boxId);
              const subtitle = box
                ? `in ${box.name} • Qty: ${item.quantity}`
                : undefined;
              return (
                <ItemRow
                  key={item.id}
                  item={item}
                  subtitle={subtitle}
                  onPress={() => router.push(`/box/${item.boxId}`)}
                />
              );
            })}
          </>
        )}
      </ScrollView>
      <TabBar activeTab="boxes" onTabChange={(tab) => {
        if (tab === 'boxes') router.replace('/(tabs)');
        else if (tab === 'scan') router.push('/scan-modal');
        else if (tab === 'stats') router.push('/(tabs)/stats');
        else if (tab === 'profile') router.push('/(tabs)/profile');
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 100 },
  resultCount: {
    fontSize: 14,
    color: '#999',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#667eea',
    marginBottom: 10,
  },
  sectionTitleItems: {
    marginTop: 20,
  },
});
