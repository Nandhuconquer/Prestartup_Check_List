import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const SidebarRight = ({ onClose }: { onClose: () => void }) => {
  const notifications = [
    'New user registered',
    'Order #1234 completed',
    'System update available',
  ];

  return (
    <View className="flex-1 p-4">
      <Text className="text-lg font-bold mb-4 text-gray-700 dark:text-gray-200">Notifications</Text>

      {notifications.map((n, i) => (
        <View key={i} className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mb-3">
          <Text className="text-gray-800 dark:text-gray-100">{n}</Text>
        </View>
      ))}

      <TouchableOpacity className="absolute bottom-4 right-4" onPress={onClose}>
        <Text className="text-blue-500 font-semibold">Close</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SidebarRight;
