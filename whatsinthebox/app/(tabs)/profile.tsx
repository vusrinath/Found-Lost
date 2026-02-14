import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { NavBar, SettingsRow, Button, TabBar } from '@/components';

export default function ProfileScreen() {
  const router = useRouter();

  const handleDeleteAll = () => {
    Alert.alert(
      'Delete All Data',
      'This will permanently delete all boxes and items. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {} },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <NavBar
        title="Settings"
        leftAction={{ label: '← Back', onPress: () => router.back() }}
      />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Text style={styles.section}>ACCOUNT</Text>
        <SettingsRow
          icon="☁️"
          title="Cloud Backup"
          subtitle="Last backup: 2 hours ago"
          onPress={() => {}}
        />
        <SettingsRow
          icon="👥"
          title="Family Sharing"
          onPress={() => {}}
        />

        <Text style={styles.section}>APP SETTINGS</Text>
        <SettingsRow
          icon="🌙"
          title="Dark Mode"
          value={false}
          onValueChange={() => {}}
        />
        <SettingsRow
          icon="🔔"
          title="Notifications"
          onPress={() => {}}
        />
        <SettingsRow
          icon="📏"
          title="Measurement Units"
          rightText="Imperial"
          onPress={() => {}}
        />

        <Text style={styles.section}>DATA</Text>
        <SettingsRow
          icon="📤"
          title="Export Data"
          onPress={() => {}}
        />
        <SettingsRow
          icon="📥"
          title="Import Data"
          onPress={() => {}}
        />

        <Button
          title="🗑️ Delete All Data"
          onPress={handleDeleteAll}
          variant="danger"
          style={styles.deleteButton}
        />
      </ScrollView>
      <TabBar activeTab="profile" onTabChange={(tab) => {
        if (tab === 'boxes') router.replace('/(tabs)');
        else if (tab === 'scan') router.push('/scan-modal');
        else if (tab === 'stats') router.push('/(tabs)/stats');
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { flex: 1 },
  content: { padding: 20, paddingBottom: 100 },
  section: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
    marginTop: 24,
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  deleteButton: { marginTop: 40 },
});
