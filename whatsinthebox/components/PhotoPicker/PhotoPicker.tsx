import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '@/theme/colors';

interface PhotoPickerProps {
  imageUri?: string | null;
  onImageSelected: (uri: string | null) => void;
}

export function PhotoPicker({ imageUri, onImageSelected }: PhotoPickerProps) {
  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission needed',
        'Please allow access to your photo library to add photos.'
      );
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      onImageSelected(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission needed',
        'Please allow camera access to take photos.'
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      onImageSelected(result.assets[0].uri);
    }
  };

  const showOptions = () => {
    const buttons: Array<{ text: string; onPress?: () => void; style?: 'cancel' }> = [
      { text: 'Take Photo', onPress: takePhoto },
      { text: 'Choose from Library', onPress: pickImage },
    ];
    if (imageUri) {
      buttons.push({ text: 'Remove Photo', onPress: () => onImageSelected(null) });
    }
    buttons.push({ text: 'Cancel', style: 'cancel' });
    Alert.alert('Update Photo', 'Choose an option', buttons);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={showOptions}
      activeOpacity={0.8}
    >
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.icon}>📷</Text>
          <Text style={styles.hint}>Tap to add photo</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.border,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundTertiary,
  },
  icon: { fontSize: 36, color: colors.textMuted },
  hint: { fontSize: 11, color: colors.textMuted, marginTop: 4 },
});
