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
  | '#667eea'
  | '#f093fb'
  | '#4facfe'
  | '#43e97b'
  | '#fa709a'
  | '#ffa726';

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
