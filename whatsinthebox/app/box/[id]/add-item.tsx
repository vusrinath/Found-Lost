import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  NavBar,
  FormInput,
  Button,
  QuantityStepper,
  PhotoPicker,
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
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const canSave = name.trim().length > 0 && box;

  const handleSave = () => {
    if (!canSave || !box) return;
    try {
      addItem({
        boxId: box.id,
        name: name.trim(),
        quantity,
        description: description.trim() || undefined,
        value: value ? parseFloat(value.replace(/[^0-9.]/g, '')) : undefined,
        photoUri: photoUri || undefined,
      });
      router.back();
    } catch (error) {
      console.error('Failed to add item:', error);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (!box) {
    return (
      <View style={styles.container}>
        <NavBar
          title="Add Item"
          leftAction={{ label: 'Cancel', onPress: () => router.back() }}
        />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Box not found</Text>
        </View>
      </View>
    );
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
          <PhotoPicker
            imageUri={photoUri}
            onImageSelected={setPhotoUri}
          />
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
  submitButton: { marginTop: 20 },
});
