/**
 * BoxTrack - Design system colors
 * Based on wireframe: Purple gradient (#667eea to #764ba2)
 */

export const colors = {
  primary: '#667eea',
  primaryDark: '#764ba2',
  primaryLight: '#8b9ff0',
  white: '#ffffff',
  black: '#000000',
  background: '#ffffff',
  backgroundSecondary: '#f8f9fa',
  backgroundTertiary: '#f0f0f0',
  border: '#e0e0e0',
  text: '#333333',
  textSecondary: '#666666',
  textMuted: '#999999',
  success: '#43e97b',
  error: '#d32f2f',
  warning: '#ffa726',
} as const;

export const gradients = {
  primary: ['#667eea', '#764ba2'] as const,
  statCard: ['#667eea', '#764ba2'] as const,
};
