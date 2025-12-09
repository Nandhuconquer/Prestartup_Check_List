import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { saveUser } from './api/storage';

type RegisterNavProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

const SuperAdminRegisterScreen: React.FC = () => {
  const navigation = useNavigation<RegisterNavProp>();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [orgName, setOrgName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!fullName || !email || !password || !confirm) {
      Alert.alert('Validation', 'Please fill all required fields.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Validation', 'Password must be at least 6 characters.');
      return;
    }

    if (password !== confirm) {
      Alert.alert('Validation', 'Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      // 🔹 TEMP static “created” super admin
      const fakeUser = {
        id: Date.now(),
        fullName,
        email,
        organization: orgName || 'PreStartUpCheckList',
        role: 'SuperAdmin',
      };

      // simulate API
      await new Promise(resolve => setTimeout(resolve, 800));

      await saveUser(fakeUser);

      Alert.alert('Success', 'Super Admin registered successfully!', [
        {
          text: 'Continue',
          onPress: () => navigation.replace('MainTabs'),
        },
      ]);
    } catch (err) {
      console.error('Register error:', err);
      Alert.alert('Error', 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-slate-950`}>
      <KeyboardAvoidingView
        style={tw`flex-1`}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={tw`flex-1 justify-center px-5`}>
          <View style={tw`bg-slate-900 rounded-3xl p-6 shadow-lg`}>
            <Text style={tw`text-center text-2xl font-bold text-slate-50 mb-1`}>
              Super Admin
            </Text>
            <Text style={tw`text-center text-sm text-slate-400 mb-5`}>
              Create a new super admin account for PreStartUpCheckList.
            </Text>

            {/* Full Name */}
            <Text style={tw`text-slate-200 text-xs mb-1`}>Full Name *</Text>
            <TextInput
              style={tw`h-11 px-3 rounded-2xl bg-slate-800 border border-slate-700 text-slate-100 mb-3`}
              placeholder="Ex: John Doe"
              placeholderTextColor="#9CA3AF"
              value={fullName}
              onChangeText={setFullName}
            />

            {/* Email */}
            <Text style={tw`text-slate-200 text-xs mb-1`}>Email *</Text>
            <TextInput
              style={tw`h-11 px-3 rounded-2xl bg-slate-800 border border-slate-700 text-slate-100 mb-3`}
              placeholder="admin@example.com"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* Organization (optional) */}
            <Text style={tw`text-slate-200 text-xs mb-1`}>Organization (optional)</Text>
            <TextInput
              style={tw`h-11 px-3 rounded-2xl bg-slate-800 border border-slate-700 text-slate-100 mb-3`}
              placeholder="Company / Team name"
              placeholderTextColor="#9CA3AF"
              value={orgName}
              onChangeText={setOrgName}
            />

            {/* Password */}
            <Text style={tw`text-slate-200 text-xs mb-1`}>Password *</Text>
            <TextInput
              style={tw`h-11 px-3 rounded-2xl bg-slate-800 border border-slate-700 text-slate-100 mb-3`}
              placeholder="••••••••"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {/* Confirm Password */}
            <Text style={tw`text-slate-200 text-xs mb-1`}>Confirm Password *</Text>
            <TextInput
              style={tw`h-11 px-3 rounded-2xl bg-slate-800 border border-slate-700 text-slate-100 mb-4`}
              placeholder="Repeat password"
              placeholderTextColor="#9CA3AF"
              value={confirm}
              onChangeText={setConfirm}
              secureTextEntry
            />

            {/* Register Button */}
            <TouchableOpacity
              style={tw`h-11 rounded-2xl bg-orange-500 items-center justify-center mt-1`}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={tw`text-white font-semibold text-base`}>Create Super Admin</Text>
              )}
            </TouchableOpacity>

            {/* Back to login */}
            <TouchableOpacity
              style={tw`mt-4 items-center`}
              onPress={goToLogin}
            >
              <Text style={tw`text-slate-400 text-xs`}>
                Already have an account?{' '}
                <Text style={tw`text-orange-400 font-semibold`}>Login</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SuperAdminRegisterScreen;
