import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  NavBar,
  FormInput,
  Button,
  QuantityStepper,
  PhotoPicker,
} from '@/components';
import { useBoxContext } from '@/context/BoxContext';

export default function EditItemScreen() {
  const { id, itemId } = useLocalSearchParams<{ id: string; itemId: string }>();
  const router = useRouter();
  const { getBoxById, getItemById, updateItem, deleteItem } = useBoxContext();

  const box = id ? getBoxById(id) : undefined;
  const item = itemId ? getItemById(itemId) : undefined;

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  useEffect(() => {
    if (item) {
      setName(item.name);
      setQuantity(item.quantity);
      setDescription(item.description || '');
      setValue(item.value ? String(item.value) : '');
      setPhotoUri(item.photoUri || null);
    }
  }, [item]);

  const canSave = name.trim().length > 0 && item;

  const handleSave = () => {
    if (!canSave || !item) return;
    updateItem(item.id, {
      name: name.trim(),
      quantity,
      description: description.trim() || undefined,
      value: value ? parseFloat(value.replace(/[^0-9.]/g, '')) : undefined,
      photoUri: photoUri || undefined,
    });
    router.canGoBack() ? router.back() : router.replace('/(tabs)');
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Item',
      `Are you sure you want to delete "${item?.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            if (item) {
              deleteItem(item.id);
              router.canGoBack() ? router.back() : router.replace('/(tabs)');
            }
          },
        },
      ]
    );
  };

  if (!box || !item || item.boxId !== box.id) {
    return null;
  }

  return (
    <View style={styles.container}>
      <NavBar
        title="Edit Item"
        leftAction={{ label: 'Cancel', onPress: () => router.canGoBack() ? router.back() : router.replace('/(tabs)') }}
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
          <Text style={styles.label}>Photo</Text>
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
          title="Save Changes"
          onPress={handleSave}
          disabled={!canSave}
          style={styles.submitButton}
        />
        <Button
          title="🗑️ Delete Item"
          onPress={handleDelete}
          variant="danger"
          style={styles.deleteButton}
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
  deleteButton: { marginTop: 16 },
});
