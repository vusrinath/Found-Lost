import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  NavBar,
  FormInput,
  Button,
  QuantityStepper,
} from '@/components';
import { useBoxContext } from '@/context/BoxContext';

export default function AddItemScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getBoxById, addItem } = useBoxContext();

  const box = id ? getBoxById(id) : undefined;
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const canSave = name.trim().length > 0 && box;

  const handleSave = () => {
    if (!canSave || !box) return;
    addItem({
      boxId: box.id,
      name: name.trim(),
      quantity,
      description: description.trim() || undefined,
      value: value ? parseFloat(value.replace(/[^0-9.]/g, '')) : undefined,
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
        title="Add Item"
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
          label="Item Name"
          required
          value={name}
          onChangeText={setName}
          placeholder="e.g., Blue Winter Jacket"
        />
        <View style={styles.group}>
          <Text style={styles.label}>Quantity</Text>
          <QuantityStepper value={quantity} onChange={setQuantity} />
        </View>
        <FormInput
          label="Description (Optional)"
          value={description}
          onChangeText={setDescription}
          placeholder="Color, size, condition..."
        />
        <View style={styles.group}>
          <Text style={styles.label}>Photo (Optional)</Text>
          <TouchableOpacity style={styles.photoPlaceholder}>
            <Text style={styles.photoIcon}>📷</Text>
          </TouchableOpacity>
        </View>
        <FormInput
          label="Value (Optional)"
          value={value}
          onChangeText={setValue}
          placeholder="$0.00"
          helperText="For insurance purposes"
        />
        <Button
          title={`Add Item to ${box.name}`}
          onPress={handleSave}
          disabled={!canSave}
          style={styles.submitButton}
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
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#e0e0e0',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  photoIcon: { fontSize: 40, color: '#ccc' },
  submitButton: { marginTop: 20 },
});
