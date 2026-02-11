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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import Icon from "react-native-vector-icons/Ionicons";
import { Image } from 'react-native';
import GoogleLogo from '../../assets/icons/google.png';
import MicrosoftLogo from '../../assets/icons/microsoft.png';

import { RootStackParamList } from '../../navigation/types';
import { saveUser } from './api/storage';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

type AuthMode = 'admin' | 'user';

interface LoginFormProps {
  navigation: LoginScreenNavigationProp;
}

/* ─────────────────  ADMIN FORM  ───────────────── */

const AdminLoginForm: React.FC<LoginFormProps> = ({ navigation }) => {
  const [username, setUsername] = useState('Temp Admin');
  const [email, setEmail] = useState('admin@prestartupchecklist.com');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const handleTempLogin = async () => {
    if (!username || !email) {
      Alert.alert('Validation', 'Please enter both username and email.');
      return;
    }

    setLoading(true);
    try {
      const fakeUser = {
        id: 999,
        fullName: username || 'Temp Admin',
        email: email || 'admin@prestartupchecklist.com',
        role: 'SuperAdmin',
      };

      await new Promise(resolve => setTimeout(resolve, 600));
      await saveUser(fakeUser);

      Alert.alert('Success', 'Logged in as Super Admin!');
      navigation.replace('MainTabs');
    } catch (error) {
      console.error('Temp admin login error:', error);
      Alert.alert('Error', 'Temporary admin login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Email */}
      <View style={tw`mb-3`}>
        <Text style={tw`text-[11px] text-slate-500 mb-1`}>Email</Text>
        <View style={tw`h-11 rounded-2xl bg-[#f4f4f5] px-3 justify-center`}>
          <TextInput
            style={tw`text-sm text-slate-900`}
            placeholder="admin@company.com"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      {/* Username */}
      <View style={tw`mb-5`}>
        <Text style={tw`text-[11px] text-slate-500 mb-1`}>Username</Text>
        <View style={tw`h-11 rounded-2xl bg-[#f4f4f5] px-3 justify-center`}>
          <TextInput
            style={tw`text-sm text-slate-900`}
            placeholder="Admin username"
            placeholderTextColor="#9CA3AF"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
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
          <Text style={tw`text-white text-sm font-semibold`}>Login as Admin</Text>
        )}
      </TouchableOpacity>
    </>
  );
};

/* ─────────────────  USER FORM  ───────────────── */

const UserLoginForm: React.FC<LoginFormProps> = ({ navigation }) => {
  const [email, setEmail] = useState('user@prestartupchecklist.com');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

      Alert.alert('Success', 'Logged in as user!');
      navigation.replace('MainTabs'); // later you can route to a user-only tabs set
    } catch (error) {
      console.error('Temp user login error:', error);
      Alert.alert('Error', 'Temporary user login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
      {/* Password */}
      <View style={tw`mb-5`}>
        <Text style={tw`text-[11px] text-slate-500 mb-1`}>Password</Text>
        <View
          style={tw`h-11 rounded-2xl bg-[#f4f4f5] px-3 flex-row items-center justify-between`}
        >
          <TextInput
            style={tw`flex-1 text-sm text-slate-900`}
            placeholder="••••••••"
            placeholderTextColor="#9CA3AF"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={showPassword ? "#ef4444" : "#9CA3AF"} // red when visible
            />
          </TouchableOpacity>
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
          <Text style={tw`text-white text-sm font-semibold`}>Login as User</Text>
        )}
      </TouchableOpacity>
    </>
  );
};

/* ─────────────────  MAIN SCREEN  ───────────────── */

const AdminLoginScreen: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('admin');
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleSocialPress = () => {
    Alert.alert('Disabled', 'Social login is disabled in this build.');
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
            {/* Logo / app mark */}
            <View style={tw`items-center mb-5`}>
              <View
                style={tw`w-12 h-12 rounded-full bg-red-100 items-center justify-center mb-2`}
              >
                <Text style={tw`text-red-500 text-lg font-bold`}>PS</Text>
              </View>
              <Text style={tw`text-red-500 text-lg font-semibold`}>PreStartUp</Text>
            </View>

            {/* Toggle Admin / User */}
            <View
              style={tw`flex-row bg-[#f4f4f5] rounded-full p-1 mb-6`}
            >
              <TouchableOpacity
                style={[
                  tw`flex-1 h-9 rounded-full items-center justify-center`,
                  mode === 'admin' && tw`bg-white`,
                ]}
                onPress={() => setMode('admin')}
              >
                <Text
                  style={
                    mode === 'admin'
                      ? tw`text-[12px] font-semibold text-red-500`
                      : tw`text-[12px] text-slate-500`
                  }
                >
                  Admin
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  tw`flex-1 h-9 rounded-full items-center justify-center`,
                  mode === 'user' && tw`bg-white`,
                ]}
                onPress={() => setMode('user')}
              >
                <Text
                  style={
                    mode === 'user'
                      ? tw`text-[12px] font-semibold text-red-500`
                      : tw`text-[12px] text-slate-500`
                  }
                >
                  User
                </Text>
              </TouchableOpacity>
            </View>

            {/* Small welcome text that changes with mode */}
            <View style={tw`mb-4`}>
              <Text style={tw`text-base font-semibold text-slate-900`}>
                Welcome {mode === 'admin' ? 'back,  Admin!' : 'back!'}
              </Text>
              <Text style={tw`text-[12px] text-slate-500 mt-1`}>
                {mode === 'admin'
                  ? 'Use your admin credentials to manage the checklist.'
                  : 'Sign in to view and update your startup tasks.'}
              </Text>
            </View>

            {/* Forms */}
            {mode === 'admin' ? (
              <AdminLoginForm navigation={navigation} />
            ) : (
              <UserLoginForm navigation={navigation} />
            )}

            {/* Forgot password */}
            <TouchableOpacity
              style={tw`items-center mb-5`}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={tw`text-[11px] text-red-500`}>
                Forgot password?
              </Text>
            </TouchableOpacity>


            {/* Social buttons row (placeholders) */}
            <View style={tw`flex-row justify-between mb-5`}>
              {/* Google */}
              <TouchableOpacity
                style={tw`flex-1 h-10 rounded-2xl bg-white border border-[#fecaca] mr-2 flex-row items-center justify-center`}
                onPress={handleSocialPress}
              >
                <Image
                  source={GoogleLogo}
                  style={tw`w-5 h-5 mr-2`}
                  resizeMode="contain"
                />
                <Text style={tw`text-[12px] text-slate-700 font-medium`}>Google</Text>
              </TouchableOpacity>

              {/* Microsoft */}
              <TouchableOpacity
                style={tw`flex-1 h-10 rounded-2xl bg-white border border-[#fecaca] ml-2 flex-row items-center justify-center`}
                onPress={handleSocialPress}
              >
                <Image
                  source={MicrosoftLogo}
                  style={tw`w-5 h-5 mr-2`}
                  resizeMode="contain"
                />
                <Text style={tw`text-[12px] text-slate-700 font-medium`}>Microsoft</Text>
              </TouchableOpacity>
            </View>

            {/* Register link – you can point this to your super admin register screen */}
            <View style={tw`items-center`}>
              <Text style={tw`text-[11px] text-slate-400`}>
                {mode === 'admin'
                  ? "Don't have a super admin account? "
                  : "Don't have an accounts? "}
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

export default AdminLoginScreen;
