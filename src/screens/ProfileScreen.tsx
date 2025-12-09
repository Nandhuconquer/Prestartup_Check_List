import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/types';
import { getUser, removeUser } from './auth/api/storage'; // adjust path if needed

type NavProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

interface StoredUser {
  id: number;
  fullName: string;
  email: string;
  role?: string;
}

const ProfileScreen: React.FC = () => {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavProp>();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const u = await getUser();          // your existing helper
        setUser(u || null);
      } catch (e) {
        console.log('Error loading user', e);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleLogout = async () => {
    try {
      await removeUser();                    // clear AsyncStorage
      navigation.replace('Login');          // go back to login
    } catch (e) {
      Alert.alert('Error', 'Could not log out. Please try again.');
    }
  };

  if (loading) {
    return (
      <View style={tw`flex-1 items-center justify-center bg-white`}>
        <ActivityIndicator size="large" color="#FF8A3D" />
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-[#f5f5f7]`}>
      {/* Header area */}
      <View style={tw`bg-white px-5 pt-10 pb-6 flex-row items-center`}>
        <View style={tw`w-10 h-10 rounded-full bg-[#ff8a3d]/10 items-center justify-center mr-3`}>
          <Icon name="person" size={22} color="#FF8A3D" />
        </View>
        <View style={tw`flex-1`}>
          <Text style={tw`text-lg font-semibold text-[#222]`}>
            {user?.fullName || 'Admin User'}
          </Text>
          <Text style={tw`text-xs text-[#777]`}>{user?.email || 'admin@prestartupchecklist.com'}</Text>
        </View>
        <Text style={tw`text-xs px-2 py-1 rounded-full bg-[#e6f8ec] text-[#2e7d32]`}>
          {user?.role || 'SuperAdmin'}
        </Text>
      </View>

      {/* Body content */}
      <View style={tw`px-5 mt-4`}>
        <Text style={tw`text-sm font-semibold text-[#999] mb-2`}>Account</Text>

        <View style={tw`bg-white rounded-2xl p-4 mb-4`}>
          <View style={tw`flex-row items-center mb-3`}>
            <Icon name="mail-outline" size={20} color="#777" />
            <Text style={tw`ml-3 text-sm text-[#444]`}>{user?.email}</Text>
          </View>

          <View style={tw`flex-row items-center mb-3`}>
            <Icon name="shield-checkmark-outline" size={20} color="#777" />
            <Text style={tw`ml-3 text-sm text-[#444]`}>
              Role: {user?.role || 'SuperAdmin'}
            </Text>
          </View>

          <View style={tw`flex-row items-center`}>
            <Icon name="id-card-outline" size={20} color="#777" />
            <Text style={tw`ml-3 text-sm text-[#444]`}>
              User ID: {user?.id ?? 999}
            </Text>
          </View>
        </View>

        <Text style={tw`text-sm font-semibold text-[#999] mb-2`}>App</Text>

        <View style={tw`bg-white rounded-2xl p-4`}>
          <View style={tw`flex-row items-center mb-3`}>
            <Icon name="apps-outline" size={20} color="#777" />
            <Text style={tw`ml-3 text-sm text-[#444]`}>PreStartUpCheckList</Text>
          </View>

          <View style={tw`flex-row items-center mb-3`}>
            <Icon name="information-circle-outline" size={20} color="#777" />
            <Text style={tw`ml-3 text-sm text-[#444]`}>Version 0.0.1</Text>
          </View>

          <TouchableOpacity
            style={tw`mt-2 h-11 rounded-full bg-red-500 items-center justify-center`}
            onPress={handleLogout}
          >
            <Text style={tw`text-white font-semibold`}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
