import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { colors } from '@/theme/colors';
import type { Item } from '@/types';

interface ItemRowProps {
  item: Item;
  onPress?: () => void;
  subtitle?: string;
}

export function ItemRow({ item, onPress, subtitle }: ItemRowProps) {
  const qtyText = item.quantityUnit
    ? `Qty: ${item.quantity} ${item.quantityUnit}`
    : `Qty: ${item.quantity}`;

  const content = (
    <>
      <View style={styles.photo}>
        {item.photoUri ? (
          <Image
            source={{ uri: item.photoUri }}
            style={styles.photoImage}
            resizeMode="cover"
          />
        ) : (
          <Text style={styles.photoPlaceholder}>📦</Text>
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.qty}>{subtitle ?? qtyText}</Text>
      </View>
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={styles.row}>{content}</View>;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundTertiary,
  },
  photo: {
    width: 50,
    height: 50,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 8,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  photoPlaceholder: {
    fontSize: 24,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    color: colors.text,
    marginBottom: 3,
  },
  qty: {
    fontSize: 13,
    color: colors.textMuted,
  },
});
