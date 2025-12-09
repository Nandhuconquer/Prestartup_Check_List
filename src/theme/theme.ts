// src/theme/themes.ts
export type ThemeName =
  | 'startupRed'
  | 'financeBlue'
  | 'healthGreen'
  | 'creativePurple';

export type AppTheme = {
  name: ThemeName;
  colors: {
    primary: string;
    primaryLight: string;
    primaryDark: string;

    background: string;
    surface: string;

    textPrimary: string;
    textSecondary: string;
    border: string;

    success: string;
    warning: string;
    danger: string;

    overlay: string;
  };
};

export const themes: Record<ThemeName, AppTheme> = {
  // 🔴 Default – for generic startups
  startupRed: {
    name: 'startupRed',
    colors: {
      primary: '#EF4444',       // red-500
      primaryLight: '#FCA5A5',  // red-300
      primaryDark: '#B91C1C',   // red-700

      background: '#F7F7F8',
      surface: '#FFFFFF',

      textPrimary: '#111827',   // gray-900
      textSecondary: '#6B7280', // gray-500
      border: '#E5E7EB',

      success: '#10B981',
      warning: '#F59E0B',
      danger: '#DC2626',

      overlay: 'rgba(0,0,0,0.3)',
    },
  },

  // 🔵 Finance / SaaS / Tech
  financeBlue: {
    name: 'financeBlue',
    colors: {
      primary: '#2563EB',       // blue-600
      primaryLight: '#93C5FD',
      primaryDark: '#1D4ED8',

      background: '#F3F4F6',
      surface: '#FFFFFF',

      textPrimary: '#020617',
      textSecondary: '#64748B',
      border: '#E5E7EB',

      success: '#16A34A',
      warning: '#F97316',
      danger: '#DC2626',

      overlay: 'rgba(15,23,42,0.35)',
    },
  },

  // 🟢 Health / Wellness / Eco
  healthGreen: {
    name: 'healthGreen',
    colors: {
      primary: '#22C55E',       // green-500
      primaryLight: '#BBF7D0',
      primaryDark: '#15803D',

      background: '#F5FDF7',
      surface: '#FFFFFF',

      textPrimary: '#064E3B',
      textSecondary: '#6B7280',
      border: '#DCFCE7',

      success: '#22C55E',
      warning: '#F97316',
      danger: '#DC2626',

      overlay: 'rgba(15,118,110,0.30)',
    },
  },

  // 🟣 Creative / Agency / Design
  creativePurple: {
    name: 'creativePurple',
    colors: {
      primary: '#8B5CF6',       // violet-500
      primaryLight: '#DDD6FE',
      primaryDark: '#6D28D9',

      background: '#F5F3FF',
      surface: '#FFFFFF',

      textPrimary: '#111827',
      textSecondary: '#6B7280',
      border: '#E5E7EB',

      success: '#22C55E',
      warning: '#F59E0B',
      danger: '#EF4444',

      overlay: 'rgba(76,29,149,0.30)',
    },
  },
};
