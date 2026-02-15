import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  NavBar,
  SearchBar,
  StatsCard,
  BoxCard,
  TabBar,
  FAB,
  EmptyState,
} from '@/components';
import { useBoxContext } from '@/context/BoxContext';
import type { TabId } from '@/components/TabBar';

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const {
    boxes,
    getBoxItemQuantity,
    getTotalItemCount,
    search,
  } = useBoxContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabId>('boxes');

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    if (tab === 'scan') router.push('/scan-modal');
    else if (tab === 'stats') router.push('/(tabs)/stats');
    else if (tab === 'profile') router.push('/(tabs)/profile');
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      router.push({ pathname: '/search', params: { q: searchQuery.trim() } });
    }
  };

  const filteredBoxes = useMemo(
    () => (searchQuery.trim() ? search(searchQuery).boxes : boxes),
    [searchQuery, boxes, search]
  );

  const maxContentWidth = width > 768 ? Math.min(width * 0.7, 600) : width;

  return (
    <View style={styles.container}>
      <NavBar
        title="My Boxes"
        rightAction={{ label: '⚙️', onPress: () => router.push('/(tabs)/profile') }}
      />
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearchSubmit}
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { maxWidth: maxContentWidth }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.statsRow}>
          <StatsCard value={boxes.length} label="Total Boxes" />
          <StatsCard value={getTotalItemCount()} label="Total Items" />
        </View>

        {filteredBoxes.length === 0 ? (
          <EmptyState
            icon={<Image source={require('@/assets/images/box.png')} style={styles.emptyIcon} />}
            title={searchQuery ? 'No boxes found' : 'No boxes yet'}
            subtitle={
              searchQuery
                ? 'Try a different search'
                : 'Tap + to create your first box'
            }
          />
        ) : (
          filteredBoxes.map((box) => (
            <BoxCard
              key={box.id}
              box={box}
              itemCount={getBoxItemQuantity(box.id)}
              onPress={() => router.push(`/box/${box.id}`)}
            />
          ))
        )}
      </ScrollView>

      <FAB onPress={() => router.push('/create-box')} />

      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 100,
    alignSelf: 'center',
    width: '100%',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  emptyIcon: {
    width: 80,
    height: 80,
  },
});
