import resolveConfig from 'tailwindcss/resolveConfig';
import type { RequiredConfig } from 'tailwindcss/types/config';
import type { DefaultColors } from 'tailwindcss/types/generated/colors';
import tailwindConfig from '../../tailwind.config';

const fullConfig = resolveConfig(tailwindConfig as RequiredConfig);
const colors = fullConfig.theme?.colors as unknown as DefaultColors;

// Colors
export const black = colors.neutral[900];
export const grayDark = colors.neutral[500];
export const grayLight = colors.neutral[100];

// Typography
export const textSm = 14;
export const textBase = 16;
export const textLg = 24;
export const textXl = 30;
export const leadingTight = '120%';
export const leadingRelaxed = '160%';

// Borders
export const borderBase = 2;
