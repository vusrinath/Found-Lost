/**
 * BoxTrack - Data context for boxes and items
 * Persists to AsyncStorage, in-memory for fast access
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import type { Box, Item, BoxCategory, BoxColor } from '@/types';
import { Alert } from 'react-native';

const MAX_BOXES = 20;
const MAX_ITEMS_PER_BOX = 20;

const getStorageKey = () => {
  const key = process.env.EXPO_PUBLIC_STORAGE_KEY;
  if (!key) {
    throw new Error('EXPO_PUBLIC_STORAGE_KEY environment variable is required');
  }
  return key;
};

interface BoxContextValue {
  boxes: Box[];
  items: Item[];
  addBox: (box: Omit<Box, 'id' | 'qrCodeId' | 'createdAt' | 'updatedAt' | 'itemIds'>) => Box;
  updateBox: (id: string, updates: Partial<Box>) => void;
  deleteBox: (id: string) => void;
  getBoxById: (id: string) => Box | undefined;
  getBoxByQrId: (qrId: string) => Box | undefined;
  addItem: (item: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>) => Item;
  updateItem: (id: string, updates: Partial<Item>) => void;
  deleteItem: (id: string) => void;
  getItemsByBoxId: (boxId: string) => Item[];
  getItemById: (id: string) => Item | undefined;
  getItemCount: (boxId: string) => number;
  getBoxItemQuantity: (boxId: string) => number;
  getTotalItemCount: () => number;
  search: (query: string) => { boxes: Box[]; items: Item[] };
  loadData: () => Promise<void>;
}

const BoxContext = createContext<BoxContextValue | null>(null);

export function BoxProvider({ children }: { children: React.ReactNode }) {
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [loaded, setLoaded] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(getStorageKey());
      if (raw) {
        const { boxes: b, items: i } = JSON.parse(raw);
        setBoxes(b || []);
        setItems(i || []);
      }
    } catch (e) {
      console.warn('Failed to load BoxTrack data:', e);
    } finally {
      setLoaded(true);
    }
  }, []);

  const saveData = useCallback(async (b: Box[], i: Item[]) => {
    try {
      await AsyncStorage.setItem(
        getStorageKey(),
        JSON.stringify({ boxes: b, items: i })
      );
    } catch (e) {
      console.warn('Failed to save BoxTrack data:', e);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (loaded) {
      saveData(boxes, items);
    }
  }, [boxes, items, loaded, saveData]);

  const addBox = useCallback(
    (
      box: Omit<Box, 'id' | 'qrCodeId' | 'createdAt' | 'updatedAt'>
    ): Box => {
      if (boxes.length >= MAX_BOXES) {
        Alert.alert(
          'Limit Reached',
          `You can only create up to ${MAX_BOXES} boxes in the free version. Upgrade to Pro for unlimited boxes.`
        );
        throw new Error('Box limit reached');
      }
      const now = new Date().toISOString();
      const id = uuidv4();
      const qrCodeId = `BOX-${id.slice(0, 8).toUpperCase()}`;
      const newBox: Box = {
        ...box,
        id,
        qrCodeId,
        createdAt: now,
        updatedAt: now,
      };
      setBoxes((prev) => [...prev, newBox]);
      return newBox;
    },
    [boxes.length]
  );

  const updateBox = useCallback((id: string, updates: Partial<Box>) => {
    setBoxes((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, ...updates, updatedAt: new Date().toISOString() }
          : b
      )
    );
  }, []);

  const deleteBox = useCallback((id: string) => {
    setBoxes((prev) => prev.filter((b) => b.id !== id));
    setItems((prev) => prev.filter((i) => i.boxId !== id));
  }, []);

  const getBoxById = useCallback(
    (id: string) => boxes.find((b) => b.id === id),
    [boxes]
  );

  const getBoxByQrId = useCallback(
    (qrId: string) =>
      boxes.find(
        (b) =>
          b.qrCodeId === qrId ||
          b.id === qrId ||
          b.qrCodeId.toLowerCase() === qrId.toLowerCase()
      ),
    [boxes]
  );

  const addItem = useCallback(
    (item: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>): Item => {
      const boxItemCount = items.filter((i) => i.boxId === item.boxId).length;
      if (boxItemCount >= MAX_ITEMS_PER_BOX) {
        Alert.alert(
          'Limit Reached',
          `You can only add up to ${MAX_ITEMS_PER_BOX} items per box in the free version. Upgrade to Pro for unlimited items.`
        );
        throw new Error('Item limit reached');
      }
      const now = new Date().toISOString();
      const id = uuidv4();
      const newItem: Item = {
        ...item,
        id,
        createdAt: now,
        updatedAt: now,
      };
      setItems((prev) => [...prev, newItem]);
      setBoxes((prev) =>
        prev.map((b) =>
          b.id === item.boxId ? { ...b, updatedAt: now } : b
        )
      );
      return newItem;
    },
    [items]
  );

  const updateItem = useCallback((id: string, updates: Partial<Item>) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, ...updates, updatedAt: new Date().toISOString() }
          : i
      )
    );
  }, []);

  const deleteItem = useCallback((id: string) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      setBoxes((prev) =>
        prev.map((b) =>
          b.id === item.boxId
            ? { ...b, updatedAt: new Date().toISOString() }
            : b
        )
      );
    }
  }, [items]);

  const getItemsByBoxId = useCallback(
    (boxId: string) => items.filter((i) => i.boxId === boxId),
    [items]
  );

  const getItemById = useCallback(
    (id: string) => items.find((i) => i.id === id),
    [items]
  );

  const getItemCount = useCallback(
    (boxId: string) => items.filter((i) => i.boxId === boxId).length,
    [items]
  );

  const getBoxItemQuantity = useCallback(
    (boxId: string) =>
      items
        .filter((i) => i.boxId === boxId)
        .reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const getTotalItemCount = useCallback(() => {
    return items.reduce((sum, i) => sum + i.quantity, 0);
  }, [items]);

  const search = useCallback(
    (query: string) => {
      const q = query.toLowerCase().trim();
      if (!q) return { boxes: [], items: [] };

      const matchingItems = items.filter((i) =>
        i.name.toLowerCase().includes(q) ||
        i.description?.toLowerCase().includes(q)
      );

      const boxIdsWithMatchingItems = new Set(matchingItems.map((i) => i.boxId));
      const matchingBoxesMap = new Map<string, Box>();

      for (const b of boxes) {
        if (boxIdsWithMatchingItems.has(b.id)) {
          matchingBoxesMap.set(b.id, b);
        } else {
          const lowerName = b.name.toLowerCase();
          const lowerLocation = b.location.toLowerCase();
          const lowerCategory = b.category.toLowerCase();
          if (
            lowerName.includes(q) ||
            lowerLocation.includes(q) ||
            lowerCategory.includes(q)
          ) {
            matchingBoxesMap.set(b.id, b);
          }
        }
      }

      return { boxes: Array.from(matchingBoxesMap.values()), items: matchingItems };
    },
    [boxes, items]
  );

  const value: BoxContextValue = {
    boxes,
    items,
    addBox,
    updateBox,
    deleteBox,
    getBoxById,
    getBoxByQrId,
    addItem,
    updateItem,
    deleteItem,
    getItemsByBoxId,
    getItemById,
    getItemCount,
    getBoxItemQuantity,
    getTotalItemCount,
    search,
    loadData,
  };

  return <BoxContext.Provider value={value}>{children}</BoxContext.Provider>;
}

export function useBoxContext() {
  const ctx = useContext(BoxContext);
  if (!ctx) throw new Error('useBoxContext must be used within BoxProvider');
  return ctx;
}
