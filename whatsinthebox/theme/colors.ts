/**
 * BoxTrack - Design system colors
 * Apple-inspired palette: clean, premium, refined
 * Ref: iOS Human Interface Guidelines, App Store
 */

export const colors = {
  // Primary accent - Apple system blue
  primary: '#007AFF',
  primaryDark: '#0051D5',
  primaryLight: '#5AC8FA',
  white: '#ffffff',
  black: '#000000',
  // Backgrounds - Apple's layered grays
  background: '#ffffff',
  backgroundSecondary: '#f5f5f7',
  backgroundTertiary: '#e8e8ed',
  border: '#d1d1d6',
  // Text - Apple typography hierarchy
  text: '#1d1d1f',
  textSecondary: '#3a3a3c',
  textMuted: '#8e8e93',
  // Semantic
  success: '#34C759',
  error: '#FF3B30',
  warning: '#FF9500',
} as const;

export const gradients = {
  primary: ['#007AFF', '#0051D5'] as const,
  statCard: ['#007AFF', '#5AC8FA'] as const,
};
