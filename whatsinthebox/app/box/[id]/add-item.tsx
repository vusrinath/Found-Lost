import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, KeyboardAvoidingView, Platform } from 'react-native';
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
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [showErrors, setShowErrors] = useState(false);

  const validateName = (text: string) => {
    if (!text.trim()) {
      setNameError('Item name is required');
      return false;
    }
    if (text.length > 20) {
      setNameError('Maximum 20 characters allowed');
      return false;
    }
    if (!/^[a-zA-Z0-9\s]+$/.test(text)) {
      setNameError('No special characters allowed');
      return false;
    }
    setNameError('');
    return true;
  };

  const validateDescription = (text: string) => {
    const wordCount = text.trim().split(/\s+/).filter(w => w).length;
    if (wordCount > 100) {
      setDescriptionError('Maximum 100 words allowed');
      return false;
    }
    setDescriptionError('');
    return true;
  };

  const handleNameChange = (text: string) => {
    setName(text);
    validateName(text);
  };

  const handleDescriptionChange = (text: string) => {
    setDescription(text);
    validateDescription(text);
  };

  const handleValueChange = (text: string) => {
    setValue(text);
  };

  const canSave = name.trim().length > 0 && !nameError && !descriptionError && box;

  const handleSave = () => {
    if (!box) return;
    
    setShowErrors(true);
    const isNameValid = validateName(name);
    const isDescValid = validateDescription(description);
    
    if (!isNameValid || !isDescValid) return;
    
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
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
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
          onChangeText={handleNameChange}
          placeholder="e.g., Blue Winter Jacket"
          maxLength={20}
        />
        {showErrors && nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
        <View style={styles.group}>
          <Text style={styles.label}>Quantity</Text>
          <QuantityStepper value={quantity} onChange={setQuantity} />
        </View>
        <FormInput
          label="Description (Optional)"
          value={description}
          onChangeText={handleDescriptionChange}
          placeholder="Color, size, condition..."
        />
        {showErrors && descriptionError ? <Text style={styles.errorText}>{descriptionError}</Text> : null}
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
          onChangeText={handleValueChange}
          placeholder="$0.00"
          helperText="For insurance purposes"
          keyboardType="numeric"
        />
        <Button
          title={`Add Item to ${box.name}`}
          onPress={handleSave}
          disabled={!canSave}
          style={styles.submitButton}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 200 },
  group: { marginBottom: 20 },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  submitButton: { marginTop: 20 },
  errorText: {
    color: '#ff3b30',
    fontSize: 12,
    marginTop: 4,
    marginBottom: 16,
  },
});
