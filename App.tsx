// App.tsx
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';

import AppointmentsScreen from './src/screens/AppointmentsScreen';
import AppointmentDetailsScreen from './src/screens/AppointmentDetailsScreen';
import SuperAdminRegisterScreen from './src/screens/auth/SuperAdminRegisterScreen';
import ForgotPasswordScreen from './src/screens/auth/ForgotPasswordScreen';
import LoginScreen from './src/screens/auth/AdminLoginScreen';
import { RootStackParamList } from './src/navigation/types';
import ProfilesScreen from './src/screens/ProfileScreen';
import UserLoginScreen from './src/screens/auth/UserLoginScreen';
import { ThemeProvider } from './src/theme/ThemeProvider';
import HomeScreen from './src/screens/Dashboard/HomeScreen';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// const ProfileScreen = () => <View style={tw`flex-1 bg-white`} />;
const SettingsScreen = () => <View style={tw`flex-1 bg-white`} />;

function MainTabs() {
  const [menus, setMenus] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setMenus([
         { key: 'Home', label: 'Home', icon: 'home', component: HomeScreen }, 
        { key: 'Appointments', label: 'Appointments', icon: 'calendar', component: AppointmentsScreen },
        { key: 'Profile', label: 'Profile', icon: 'person', component: ProfilesScreen },
        { key: 'Settings', label: 'Settings', icon: 'settings', component: SettingsScreen },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <View style={tw`flex-1 items-center justify-center bg-[#0b0820]`}>
        <ActivityIndicator size="large" color="#FF8A3D" />
      </View>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const menu = menus.find(m => m.key === route.name);
          return <Icon name={menu?.icon || 'ellipse'} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: '#F44336',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: 'white' },
        tabBarLabelStyle: { fontSize: 12 },
      })}
    >
      {menus.map(menu => (
        <Tab.Screen
          key={menu.key}
          name={menu.key}
          component={menu.component}
          options={{ title: menu.label }}
        />
      ))}
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Login"              // 👈 start at login
        >
          <RootStack.Screen name="Login" component={LoginScreen} />
          <RootStack.Screen name="UserLogin" component={UserLoginScreen} />
          <RootStack.Screen name="Register" component={SuperAdminRegisterScreen} />
          <RootStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <RootStack.Screen name="MainTabs" component={MainTabs} />
          <RootStack.Screen
            name="AppointmentDetails"
            component={AppointmentDetailsScreen}
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
