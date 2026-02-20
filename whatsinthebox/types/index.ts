/**
 * BoxTrack - Type definitions
 * Modular types for boxes, items, and app state
 */

export type BoxCategory =
  | 'Kitchen'
  | 'Seasonal'
  | 'Clothing'
  | 'Tools'
  | 'Books'
  | 'Toys'
  | 'Other';

export type BoxColor =
  | '#E8F4FD'   // Light blue
  | '#E6F7ED'   // Light mint
  | '#FEF3E2'   // Light cream
  | '#FCE8F0'   // Light blush
  | '#F3E8FD'   // Light lavender
  | '#F0F0F2';  // Light gray

export interface Item {
  id: string;
  boxId: string;
  name: string;
  quantity: number;
  quantityUnit?: string; // e.g., "set", "pair"
  description?: string;
  photoUri?: string;
  value?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Box {
  id: string;
  name: string;
  description?: string;
  location: string;
  category: BoxCategory;
  color: BoxColor;
  qrCodeId: string; // Unique ID for QR code linking
  createdAt: string;
  updatedAt: string;
}

export interface SearchResult {
  boxes: Box[];
  items: Array<Item & { box: Box }>;
}
