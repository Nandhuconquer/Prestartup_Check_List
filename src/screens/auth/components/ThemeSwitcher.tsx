import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useTheme } from '../../../theme/ThemeProvider';
import { ThemeName } from '../../../theme/theme';

const items: { label: string; value: ThemeName }[] = [
  { label: 'Startup (Red)', value: 'startupRed' },
  { label: 'Finance / Tech (Blue)', value: 'financeBlue' },
  { label: 'Health / Eco (Green)', value: 'healthGreen' },
  { label: 'Creative / Agency (Purple)', value: 'creativePurple' },
];

const ThemeSwitcher: React.FC = () => {
  const { themeName, setTheme, theme } = useTheme();

  return (
    <View style={tw`mt-4`}>
      <Text style={tw`text-xs mb-2 text-slate-500`}>Theme</Text>
      {items.map(item => (
        <TouchableOpacity
          key={item.value}
          style={[
            tw`flex-row items-center justify-between py-2 px-3 rounded-xl mb-1`,
            {
              backgroundColor:
                themeName === item.value ? theme.colors.primaryLight : '#F3F4F6',
            },
          ]}
          onPress={() => setTheme(item.value)}
        >
          <Text style={tw`text-sm text-slate-800`}>{item.label}</Text>
          {themeName === item.value && (
            <Text style={{ color: theme.colors.primary, fontSize: 12 }}>●</Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ThemeSwitcher;
