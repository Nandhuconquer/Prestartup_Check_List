import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import tw from 'twrnc';
import { saveUser } from './api/storage';
import { RootStackParamList } from '../../navigation/types';

type UserLoginNavProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const UserLoginScreen: React.FC = () => {
  const navigation = useNavigation<UserLoginNavProp>();
  const [email, setEmail] = useState('user@prestartupchecklist.com');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);

  const handleTempLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation', 'Please enter email and password.');
      return;
    }

    setLoading(true);
    try {
      const fakeUser = {
        id: 501,
        fullName: 'Demo User',
        email,
        role: 'User',
      };

      await new Promise(resolve => setTimeout(resolve, 600));
      await saveUser(fakeUser);

      Alert.alert('Success', 'Logged in as User!');
      navigation.replace('MainTabs');
    } catch (error) {
      console.error('Temp user login error:', error);
      Alert.alert('Error', 'Temporary login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-[#f7f7f8]`}>
      <KeyboardAvoidingView
        style={tw`flex-1`}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={tw`flex-1 items-center justify-center px-6`}>
          <View
            style={[
              tw`w-full bg-white rounded-3xl px-7 py-8`,
              {
                maxWidth: 420,
                shadowColor: '#000',
                shadowOpacity: 0.08,
                shadowOffset: { width: 0, height: 12 },
                shadowRadius: 20,
                elevation: 5,
              },
            ]}
          >
            {/* Logo */}
            <View style={tw`items-center mb-5`}>
              <View
                style={tw`w-12 h-12 rounded-full bg-red-100 items-center justify-center mb-2`}
              >
                <Text style={tw`text-red-500 text-lg font-bold`}>PS</Text>
              </View>
              <Text style={tw`text-red-500 text-lg font-semibold`}>
                PreStartUp
              </Text>
            </View>

            <View style={tw`mb-4`}>
              <Text style={tw`text-base font-semibold text-slate-900`}>
                Welcome back!
              </Text>
              <Text style={tw`text-[12px] text-slate-500 mt-1`}>
                Sign in to continue to your checklist.
              </Text>
            </View>

            {/* Email */}
            <View style={tw`mb-3`}>
              <Text style={tw`text-[11px] text-slate-500 mb-1`}>Email</Text>
              <View style={tw`h-11 rounded-2xl bg-[#f4f4f5] px-3 justify-center`}>
                <TextInput
                  style={tw`text-sm text-slate-900`}
                  placeholder="you@example.com"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Password */}
            <View style={tw`mb-5`}>
              <Text style={tw`text-[11px] text-slate-500 mb-1`}>Password</Text>
              <View style={tw`h-11 rounded-2xl bg-[#f4f4f5] px-3 justify-center`}>
                <TextInput
                  style={tw`text-sm text-slate-900`}
                  placeholder="••••••••"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
            </View>

            {/* Login button */}
            <TouchableOpacity
              style={tw`h-11 rounded-2xl bg-red-500 items-center justify-center mb-2`}
              onPress={handleTempLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={tw`text-white text-sm font-semibold`}>
                  Login
                </Text>
              )}
            </TouchableOpacity>

            {/* Forgot password */}
            <TouchableOpacity
              style={tw`items-center mb-5`}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={tw`text-[11px] text-red-500`}>
                Forgot password?
              </Text>
            </TouchableOpacity>

            {/* Signup */}
            <View style={tw`items-center`}>
              <Text style={tw`text-[11px] text-slate-400`}>
                Don’t have an account?{' '}
                <Text
                  style={tw`text-red-500 font-semibold`}
                  onPress={() => navigation.navigate('Register')}
                >
                  Sign up
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UserLoginScreen;
