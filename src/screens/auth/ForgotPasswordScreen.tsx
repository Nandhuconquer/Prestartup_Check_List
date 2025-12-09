// src/screens/auth/ForgotPasswordScreen.tsx
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

import { RootStackParamList } from '../../navigation/types';

type ForgotNavProp = NativeStackNavigationProp<
  RootStackParamList,
  'ForgotPassword'
>;

const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation<ForgotNavProp>();
  const [email, setEmail] = useState('admin@prestartupchecklist.com');
  const [loading, setLoading] = useState(false);

  const handleSendLink = async () => {
    if (!email) {
      Alert.alert('Validation', 'Please enter your email.');
      return;
    }

    setLoading(true);
    try {
      // 🔹 simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      Alert.alert(
        'Check your email',
        `If an account exists for ${email}, a reset link has been sent.`
      );

      // back to login after success
      navigation.navigate('Login');
    } catch (err) {
      console.error('Forgot password error:', err);
      Alert.alert('Error', 'Failed to send reset link.');
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
            {/* Back / close */}
            <TouchableOpacity
              style={tw`mb-4`}
              onPress={() => navigation.goBack()}
            >
              <Text style={tw`text-xs text-slate-400`}>{'‹ Back'}</Text>
            </TouchableOpacity>

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

            {/* Heading */}
            <View style={tw`mb-5`}>
              <Text style={tw`text-xl font-semibold text-slate-900 mb-1`}>
                Reset password
              </Text>
              <Text style={tw`text-[12px] text-slate-500`}>
                Enter the email associated with your account and we&apos;ll send
                you a link to reset your password.
              </Text>
            </View>

            {/* Email field */}
            <View style={tw`mb-5`}>
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

            {/* Send button */}
            <TouchableOpacity
              style={tw`h-11 rounded-2xl bg-red-500 items-center justify-center mb-3`}
              onPress={handleSendLink}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={tw`text-white text-sm font-semibold`}>
                  Send reset link
                </Text>
              )}
            </TouchableOpacity>

            {/* Back to login link */}
            <TouchableOpacity
              style={tw`items-center mt-1`}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={tw`text-[11px] text-slate-500`}>
                Remember your password?{' '}
                <Text style={tw`text-red-500 font-semibold`}>Back to login</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
