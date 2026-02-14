import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import {
  NavBar,
  FormInput,
  Button,
  ColorPicker,
  CategoryChips,
} from '@/components';
import { useBoxContext } from '@/context/BoxContext';
import type { BoxCategory, BoxColor } from '@/types';

const DEFAULT_COLOR: BoxColor = '#667eea';
const DEFAULT_CATEGORY: BoxCategory = 'Other';

export default function CreateBoxScreen() {
  const router = useRouter();
  const { addBox } = useBoxContext();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<BoxCategory>(DEFAULT_CATEGORY);
  const [color, setColor] = useState<BoxColor>(DEFAULT_COLOR);

  const canSave = name.trim().length > 0 && location.trim().length > 0;

  const handleSave = () => {
    if (!canSave) return;
    const box = addBox({
      name: name.trim(),
      description: description.trim() || undefined,
      location: location.trim(),
      category,
      color,
    });
    router.replace(`/box/${box.id}/qr`);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <NavBar
        title="New Box"
        leftAction={{ label: 'Cancel', onPress: handleCancel }}
        rightAction={{ label: 'Save', onPress: handleSave }}
        rightDisabled={!canSave}
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <FormInput
          label="Box Name"
          required
          value={name}
          onChangeText={setName}
          placeholder="e.g., Winter Clothes"
        />
        <FormInput
          label="Description (Optional)"
          value={description}
          onChangeText={setDescription}
          placeholder="Add more details..."
        />
        <FormInput
          label="Location"
          required
          value={location}
          onChangeText={setLocation}
          placeholder="e.g., Garage - Shelf A"
        />
        <View style={styles.group}>
          <Text style={styles.label}>Category</Text>
          <CategoryChips selected={category} onSelect={setCategory} />
        </View>
        <View style={styles.group}>
          <Text style={styles.label}>Box Color</Text>
          <ColorPicker selected={color} onSelect={setColor} />
        </View>
        <Button
          title="Create Box & Generate QR Code"
          onPress={handleSave}
          disabled={!canSave}
          style={styles.createButton}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  group: { marginBottom: 20 },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  createButton: { marginTop: 20 },
});
