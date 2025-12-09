import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Alert,
} from 'react-native';
import tw from 'twrnc';
import { removeUser } from './auth/api/storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  RootStackParamList,
  AppointmentStatus,
  AppointmentParam,
} from '../navigation/types';
import { useTheme } from '../theme/ThemeProvider';
import ThemeSwitcher from '../screens/auth/components/ThemeSwitcher';   // 👈 add this

type Props = NativeStackScreenProps<RootStackParamList, 'Appointments'>;

type Appointment = AppointmentParam;

const APPOINTMENTS: Appointment[] = [
  {
    id: '1',
    name: 'Gloria Gibson',
    avatar: 'https://i.pravatar.cc/150?img=47',
    subtitle: 'Weight lifting • In Person',
    date: '18/10/2021',
    time: '12:00',
    status: 'Confirmed',
  },
  {
    id: '2',
    name: 'Melissa Ramos',
    avatar: 'https://i.pravatar.cc/150?img=32',
    subtitle: 'Cardio • Video Session',
    date: '18/10/2021',
    time: '08:30',
    status: 'Rescheduled',
  },
  {
    id: '3',
    name: 'Isabella Owens',
    avatar: 'https://i.pravatar.cc/150?img=12',
    subtitle: 'Yoga • In Person',
    date: '18/10/2021',
    time: '14:30',
    status: 'Unconfirmed',
  },
];

function getStatusColors(status: AppointmentStatus) {
  switch (status) {
    case 'Confirmed':
      return { bg: '#E6F8EC', text: '#2E7D32' };
    case 'Rescheduled':
      return { bg: '#FFF3E0', text: '#EF6C00' };
    case 'Unconfirmed':
      return { bg: '#FFEBEE', text: '#C62828' };
    default:
      return { bg: '#EEEEEE', text: '#555555' };
  }
}

const AppointmentsScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await removeUser();
      navigation.replace('Login');
    } catch (e) {
      Alert.alert('Error', 'Could not log out. Please try again.');
    }
  };

  const renderItem = ({ item }: { item: Appointment }) => {
    const statusColors = getStatusColors(item.status);

    return (
      <View style={tw`px-4 mt-4`}>
        <View
          style={[
            tw`rounded-2xl p-4 mb-4 relative`,
            {
              backgroundColor: theme.colors.surface,
              shadowColor: '#000',
              shadowOpacity: 0.06,
              shadowOffset: { width: 0, height: 3 },
              shadowRadius: 6,
              elevation: 3,
            },
          ]}
        >
          {/* Top row */}
          <View style={tw`flex-row items-center mb-3`}>
            <Image
              source={{ uri: item.avatar }}
              style={tw`w-12 h-12 rounded-full mr-3`}
            />

            <View style={tw`flex-1`}>
              <Text
                style={[
                  tw`text-base font-semibold`,
                  { color: theme.colors.textPrimary },
                ]}
              >
                {item.name}
              </Text>
              <Text
                style={[
                  tw`text-xs`,
                  { color: theme.colors.textSecondary },
                ]}
              >
                {item.subtitle}
              </Text>
            </View>

            {/* three-dot dropdown trigger */}
            <TouchableOpacity
              style={tw`w-8 h-8 items-center justify-center`}
              onPress={() =>
                setMenuOpenId(menuOpenId === item.id ? null : item.id)
              }
            >
              <View style={tw`items-center justify-between h-4`}>
                <View style={tw`w-1 h-1 rounded-full bg-[#999]`} />
                <View style={tw`w-1 h-1 rounded-full bg-[#999]`} />
                <View style={tw`w-1 h-1 rounded-full bg-[#999]`} />
              </View>
            </TouchableOpacity>
          </View>

          {/* Middle row */}
          <View style={tw`flex-row items-center mb-3`}>
            <View style={tw`flex-row items-center mr-4`}>
              <Text style={[tw`mr-1`, { color: theme.colors.primary }]}>📅</Text>
              <Text style={tw`text-xs text-[#555555]`}>{item.date}</Text>
            </View>

            <View style={tw`flex-row items-center mr-4`}>
              <Text style={[tw`mr-1`, { color: theme.colors.primary }]}>⏰</Text>
              <Text style={tw`text-xs text-[#555555]`}>{item.time}</Text>
            </View>

            <View
              style={[
                tw`ml-auto px-2 py-1 rounded-full`,
                { backgroundColor: statusColors.bg },
              ]}
            >
              <Text
                style={[
                  tw`text-xs font-semibold`,
                  { color: statusColors.text },
                ]}
              >
                {item.status}
              </Text>
            </View>
          </View>

          {/* Bottom row buttons */}
          <View style={tw`flex-row justify-between mt-1`}>
            <TouchableOpacity
              style={[
                tw`flex-1 mr-2 h-10 rounded-full border items-center justify-center`,
                { borderColor: theme.colors.primary },
              ]}
              onPress={() => console.log('Cancel', item.id)}
            >
              <Text
                style={[
                  tw`text-sm font-medium`,
                  { color: theme.colors.primary },
                ]}
              >
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                tw`flex-1 ml-2 h-10 rounded-full items-center justify-center`,
                { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => console.log('Edit', item.id)}
            >
              <Text style={tw`text-sm font-medium text-white`}>Edit</Text>
            </TouchableOpacity>
          </View>

          {/* Per-card dropdown menu */}
          {menuOpenId === item.id && (
            <View
              style={[
                tw`absolute right-3 top-10 rounded-xl p-3`,
                {
                  backgroundColor: theme.colors.surface,
                  shadowColor: '#000',
                  shadowOpacity: 0.12,
                  shadowOffset: { width: 0, height: 4 },
                  shadowRadius: 8,
                  elevation: 6,
                },
              ]}
            >
              <TouchableOpacity
                style={tw`py-1`}
                onPress={() => {
                  setMenuOpenId(null);
                  navigation.navigate('AppointmentDetails', {
                    appointment: item,
                  });
                }}
              >
                <Text style={tw`text-sm text-[#333]`}>View details</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={tw`py-1`}
                onPress={() => {
                  console.log('Reschedule', item.id);
                  setMenuOpenId(null);
                }}
              >
                <Text style={tw`text-sm text-[#333]`}>Reschedule</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={tw`py-1 mt-1`}
                onPress={() => {
                  console.log('Cancel appointment (menu)', item.id);
                  setMenuOpenId(null);
                }}
              >
                <Text style={tw`text-sm text-red-500 font-semibold`}>
                  Cancel appointment
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[tw`flex-1`, { backgroundColor: theme.colors.background }]}
    >
      {/* Header with hamburger */}
      <View
        style={[
          tw`px-4 py-3 flex-row items-center`,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <TouchableOpacity
          style={tw`w-8 h-8 rounded-full items-center justify-center`}
          onPress={() => setDrawerOpen(true)}
        >
          <View
            style={[
              tw`w-5 h-[2px] mb-1`,
              { backgroundColor: theme.colors.primary },
            ]}
          />
          <View
            style={[
              tw`w-5 h-[2px] mb-1`,
              { backgroundColor: theme.colors.primary },
            ]}
          />
          <View
            style={[
              tw`w-5 h-[2px]`,
              { backgroundColor: theme.colors.primary },
            ]}
          />
        </TouchableOpacity>

        <Text
          style={[
            tw`flex-1 text-center text-xl font-semibold`,
            { color: theme.colors.textPrimary },
          ]}
        >
          Your Appointments
        </Text>

        <View style={tw`w-8`} />
      </View>

      {/* List */}
      <FlatList
        data={APPOINTMENTS}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={tw`pb-4`}
        showsVerticalScrollIndicator={false}
      />

      {/* Left drawer */}
      {drawerOpen && (
        <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
          <TouchableOpacity
            style={{ flex: 1, backgroundColor: theme.colors.overlay }}
            activeOpacity={1}
            onPress={() => setDrawerOpen(false)}
          />

          <View
            style={[
              tw`absolute left-0 top-0 bottom-0 w-60 pt-10 pb-6 px-4`,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            <Text
              style={[
                tw`text-lg font-semibold mb-6`,
                { color: theme.colors.textPrimary },
              ]}
            >
              Menu
            </Text>

            <TouchableOpacity
              style={tw`py-2`}
              onPress={() => {
                console.log('My Appointments');
                setDrawerOpen(false);
              }}
            >
              <Text
                style={[
                  tw`text-base`,
                  { color: theme.colors.textPrimary },
                ]}
              >
                My Appointments
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`py-2`}
              onPress={() => {
                console.log('Profile');
                setDrawerOpen(false);
              }}
            >
              <Text
                style={[
                  tw`text-base`,
                  { color: theme.colors.textPrimary },
                ]}
              >
                Profile
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`py-2`}
              onPress={() => {
                console.log('Settings');
                setDrawerOpen(false);
              }}
            >
              <Text
                style={[
                  tw`text-base`,
                  { color: theme.colors.textPrimary },
                ]}
              >
                Settings
              </Text>
            </TouchableOpacity>

            {/* 🔽 Theme switcher inside drawer */}
            <ThemeSwitcher />

            <TouchableOpacity
              style={tw`py-2 mt-6`}
              onPress={() => {
                handleLogout();
                setDrawerOpen(false);
              }}
            >
              <Text
                style={[
                  tw`text-base font-semibold`,
                  { color: theme.colors.danger },
                ]}
              >
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default AppointmentsScreen;
