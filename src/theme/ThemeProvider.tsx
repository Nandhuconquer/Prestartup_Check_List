import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themes, ThemeName, AppTheme } from './theme';

type ThemeContextValue = {
  theme: AppTheme;
  themeName: ThemeName;
  setTheme: (name: ThemeName) => void;
  loading: boolean;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = 'app_theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeName, setThemeName] = useState<ThemeName>('startupRed');
  const [loading, setLoading] = useState(true);

  // load saved theme once
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved && saved in themes) {
          setThemeName(saved as ThemeName);
        }
      } catch (e) {
        console.log('Error loading theme', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const setTheme = (name: ThemeName) => {
    setThemeName(name);
    AsyncStorage.setItem(STORAGE_KEY, name).catch(err =>
      console.log('Error saving theme', err),
    );
  };

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme: themes[themeName],
      themeName,
      setTheme,
      loading,
    }),
    [themeName, loading],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }
  return ctx;
};
