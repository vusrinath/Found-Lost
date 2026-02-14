import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  NavBar,
  FormInput,
  Button,
  ColorPicker,
  CategoryChips,
} from '@/components';
import { useBoxContext } from '@/context/BoxContext';
import type { BoxCategory, BoxColor } from '@/types';

export default function EditBoxScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getBoxById, updateBox } = useBoxContext();

  const box = id ? getBoxById(id) : undefined;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<BoxCategory>('Other');
  const [color, setColor] = useState<BoxColor>('#E8F4FD');

  useEffect(() => {
    if (box) {
      setName(box.name);
      setDescription(box.description || '');
      setLocation(box.location);
      setCategory(box.category);
      setColor(box.color as BoxColor);
    }
  }, [box]);

  const canSave = name.trim().length > 0 && location.trim().length > 0 && box;

  const handleSave = () => {
    if (!canSave || !box) return;
    updateBox(box.id, {
      name: name.trim(),
      description: description.trim() || undefined,
      location: location.trim(),
      category,
      color,
    });
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  if (!box) {
    return null;
  }

  return (
    <View style={styles.container}>
      <NavBar
        title="Edit Box"
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
          title="Save Changes"
          onPress={handleSave}
          disabled={!canSave}
          style={styles.saveButton}
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
  saveButton: { marginTop: 20 },
});
