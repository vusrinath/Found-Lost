/**
 * Hook for responsive layouts - iPhone & iPad support
 * Uses breakpoints for adaptive spacing and sizing
 */

import { useState, useEffect } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

const BREAKPOINTS = {
  phone: 0,
  phoneLarge: 414,
  tablet: 768,
  tabletLarge: 1024,
} as const;

export function useResponsiveDimensions() {
  const [dimensions, setDimensions] = useState(() => Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({ window }: { window: ScaledSize }) => setDimensions(window)
    );
    return () => subscription?.remove();
  }, []);

  const { width, height } = dimensions;

  const isPhone = width < BREAKPOINTS.tablet;
  const isTablet = width >= BREAKPOINTS.tablet;
  const isTabletLarge = width >= BREAKPOINTS.tabletLarge;

  // Scale factors for consistent sizing across devices
  const scale = Math.min(width / 375, 2); // Base: iPhone SE/8 width
  const verticalScale = Math.min(height / 667, 2);

  // Responsive spacing
  const spacing = {
    xs: Math.round(4 * scale),
    sm: Math.round(8 * scale),
    md: Math.round(16 * scale),
    lg: Math.round(24 * scale),
    xl: Math.round(32 * scale),
  };

  // Max content width for iPad (centered layout)
  const maxContentWidth = isTablet ? Math.min(width * 0.7, 600) : width;

  return {
    width,
    height,
    isPhone,
    isTablet,
    isTabletLarge,
    scale,
    verticalScale,
    spacing,
    maxContentWidth,
    breakpoints: BREAKPOINTS,
  };
}
