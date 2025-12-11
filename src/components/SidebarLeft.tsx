import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Home, User, Settings, LogOut } from 'lucide-react-native';

const SidebarLeft = ({ onClose }: { onClose: () => void }) => {
  const menu = [
    { icon: <Home size={20} color="#1E90FF" />, label: 'Home' },
    { icon: <User size={20} color="#1E90FF" />, label: 'Profile' },
    { icon: <Settings size={20} color="#1E90FF" />, label: 'Settings' },
    { icon: <LogOut size={20} color="#1E90FF" />, label: 'Logout' },
  ];

  return (
    <View className="flex-1 p-4">
      <Text className="text-lg font-bold mb-4 text-gray-700 dark:text-gray-200">Menu</Text>

      {menu.map((item, i) => (
        <TouchableOpacity
          key={i}
          className="flex-row items-center mb-3"
          onPress={() => console.log(item.label)}
        >
          {item.icon}
          <Text className="ml-3 text-gray-800 dark:text-gray-100 text-base">{item.label}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity className="absolute bottom-4 left-4" onPress={onClose}>
        <Text className="text-blue-500 font-semibold">Close</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SidebarLeft;
