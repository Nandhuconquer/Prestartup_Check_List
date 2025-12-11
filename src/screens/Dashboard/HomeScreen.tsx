// src/screens/HomeScreen.tsx
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';

const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = width * 0.7;

const MENU_ITEMS = [
  { label: 'Dashboard Home', icon: 'home-outline' },
  { label: 'Checklists', icon: 'checkbox-outline' },
  { label: 'Appointments', icon: 'calendar-outline' },
  { label: 'Teams', icon: 'people-outline' },
  { label: 'Settings', icon: 'settings-outline' },
];

const NOTIFICATIONS = [
  'New user registered',
  'Order #1234 completed',
  'System update available',
  '3 checklist items due today',
];

const RECENT_ACTIVITY = [
  'Checklist "IT Setup" marked 80% complete',
  'New appointment booked with Legal team',
  'Vendor onboarding form submitted',
  'Finance checklist updated by Admin',
];

const HomeScreen: React.FC = () => {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  const leftX = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
  const rightX = useRef(new Animated.Value(SIDEBAR_WIDTH)).current;

  const animateLeft = (open: boolean) => {
    Animated.timing(leftX, {
      toValue: open ? 0 : -SIDEBAR_WIDTH,
      duration: 220,
      useNativeDriver: true,
    }).start(() => setLeftOpen(open));
  };

  const animateRight = (open: boolean) => {
    Animated.timing(rightX, {
      toValue: open ? 0 : SIDEBAR_WIDTH,
      duration: 220,
      useNativeDriver: true,
    }).start(() => setRightOpen(open));
  };

  const toggleLeft = () => {
    animateLeft(!leftOpen);
    if (rightOpen) animateRight(false);
  };

  const toggleRight = () => {
    animateRight(!rightOpen);
    if (leftOpen) animateLeft(false);
  };

  const closeAll = () => {
    if (leftOpen) animateLeft(false);
    if (rightOpen) animateRight(false);
  };

  const anyOpen = leftOpen || rightOpen;

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`flex-1`}>
        {/* Backdrop when sidebars are open */}
        {anyOpen && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={closeAll}
            style={tw`absolute inset-0 bg-black/20 z-10`}
          />
        )}

        {/* LEFT MENU SIDEBAR */}
        <Animated.View
          style={[
            tw`absolute top-0 bottom-0 bg-white border-r border-gray-200 z-20`,
            {
              width: SIDEBAR_WIDTH,
              transform: [{ translateX: leftX }],
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 6,
            },
          ]}
        >
          <View style={tw`flex-1 px-4 pt-6 pb-4`}>
            <Text style={tw`text-red-500 text-xl font-semibold mb-5`}>
              Navigation
            </Text>

            {MENU_ITEMS.map(item => (
              <TouchableOpacity
                key={item.label}
                style={tw`flex-row items-center mb-3 p-3 rounded-xl bg-gray-100`}
              >
                <Icon
                  name={item.icon}
                  size={20}
                  color="#ef4444"
                  style={tw`mr-3`}
                />
                <Text style={tw`text-gray-800 text-base`}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* RIGHT NOTIFICATIONS SIDEBAR */}
        <Animated.View
          style={[
            tw`absolute top-0 bottom-0 right-0 bg-white border-l border-gray-200 z-20`,
            {
              width: SIDEBAR_WIDTH,
              transform: [{ translateX: rightX }],
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 6,
            },
          ]}
        >
          <View style={tw`flex-1 px-4 pt-6 pb-4`}>
            <View style={tw`flex-row items-center justify-between mb-4`}>
              <Text style={tw`text-red-500 text-xl font-semibold`}>
                Notifications
              </Text>
              <View style={tw`bg-red-500 rounded-full px-3 py-1`}>
                <Text style={tw`text-white text-xs font-semibold`}>
                  {NOTIFICATIONS.length} new
                </Text>
              </View>
            </View>

            {NOTIFICATIONS.map((n, idx) => (
              <View
                key={idx}
                style={tw`mb-3 p-3 rounded-xl bg-red-50 border border-red-100`}
              >
                <Text style={tw`text-gray-900`}>{n}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* MAIN DASHBOARD CONTENT */}
        <View style={tw`flex-1`}>
          <ScrollView
            contentContainerStyle={tw`pb-24 px-4 pt-4`}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={tw`flex-row items-center justify-between mb-4`}>
              <View>
                <Text style={tw`text-xs text-gray-500`}>
                  Today • {new Date().toLocaleDateString()}
                </Text>
                <Text style={tw`text-xl font-semibold text-gray-900`}>
                  Pre-Startup Dashboard
                </Text>
              </View>
              <View style={tw`flex-row items-center`}>
                <View
                  style={tw`w-10 h-10 rounded-full bg-red-100 items-center justify-center mr-2`}
                >
                  <Icon name="person-outline" size={22} color="#ef4444" />
                </View>
              </View>
            </View>

            {/* KPI cards (2 x 2) */}
            <View style={tw`flex-row flex-wrap -mx-1 mb-4`}>
              <View style={tw`w-1/2 px-1 mb-2`}>
                <View style={tw`bg-red-50 rounded-2xl p-4`}>
                  <Text style={tw`text-xs text-gray-500 mb-1`}>
                    Pending checklists
                  </Text>
                  <Text style={tw`text-2xl font-bold text-red-600`}>12</Text>
                </View>
              </View>
              <View style={tw`w-1/2 px-1 mb-2`}>
                <View style={tw`bg-red-50 rounded-2xl p-4`}>
                  <Text style={tw`text-xs text-gray-500 mb-1`}>
                    Completed today
                  </Text>
                  <Text style={tw`text-2xl font-bold text-red-600`}>5</Text>
                </View>
              </View>
              <View style={tw`w-1/2 px-1 mb-2`}>
                <View style={tw`bg-gray-100 rounded-2xl p-4`}>
                  <Text style={tw`text-xs text-gray-500 mb-1`}>
                    Today&apos;s appointments
                  </Text>
                  <Text style={tw`text-2xl font-bold text-gray-900`}>3</Text>
                </View>
              </View>
              <View style={tw`w-1/2 px-1 mb-2`}>
                <View style={tw`bg-gray-100 rounded-2xl p-4`}>
                  <Text style={tw`text-xs text-gray-500 mb-1`}>
                    Team members active
                  </Text>
                  <Text style={tw`text-2xl font-bold text-gray-900`}>7</Text>
                </View>
              </View>
            </View>

            {/* Today section */}
            <View style={tw`mb-4`}>
              <Text style={tw`text-base font-semibold text-gray-900 mb-2`}>
                Today&apos;s overview
              </Text>

              <View style={tw`bg-white rounded-2xl p-4 border border-gray-100 mb-3`}>
                <View style={tw`flex-row items-center mb-2`}>
                  <View
                    style={tw`w-8 h-8 rounded-full bg-red-100 items-center justify-center mr-3`}
                  >
                    <Icon
                      name="calendar-outline"
                      size={20}
                      color="#ef4444"
                    />
                  </View>
                  <View>
                    <Text style={tw`text-gray-900 font-semibold`}>
                      Next appointment
                    </Text>
                    <Text style={tw`text-xs text-gray-500`}>
                      3:30 PM • Legal review call
                    </Text>
                  </View>
                </View>
              </View>

              <View style={tw`bg-white rounded-2xl p-4 border border-gray-100`}>
                <View style={tw`flex-row items-center justify-between mb-2`}>
                  <Text style={tw`text-gray-900 font-semibold`}>
                    Checklist progress
                  </Text>
                  <Text style={tw`text-xs text-red-500 font-semibold`}>
                    12 open / 5 closed
                  </Text>
                </View>
                <View
                  style={tw`h-2 rounded-full bg-gray-200 overflow-hidden mb-2`}
                >
                  <View
                    style={[
                      tw`h-2 rounded-full bg-red-500`,
                      { width: '60%' },
                    ]}
                  />
                </View>
                <Text style={tw`text-xs text-gray-500`}>
                  You&apos;re 60% done with today&apos;s pre-startup tasks.
                </Text>
              </View>
            </View>

            {/* Recent activity */}
            <View style={tw`mb-4`}>
              <Text style={tw`text-base font-semibold text-gray-900 mb-2`}>
                Recent activity
              </Text>
              {RECENT_ACTIVITY.map((item, idx) => (
                <View
                  key={idx}
                  style={tw`flex-row items-start mb-2 p-3 rounded-xl bg-gray-50`}
                >
                  <Icon
                    name="time-outline"
                    size={18}
                    color="#9ca3af"
                    style={tw`mt-0.5 mr-2`}
                  />
                  <Text style={tw`text-gray-800 text-xs`}>{item}</Text>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* FLOATING EDGE BUTTONS */}
          <View
            pointerEvents="box-none"
            style={tw`absolute inset-y-0 left-0 right-0 z-30`}
          >
            <View style={tw`flex-1 flex-row items-center justify-between px-2`}>
              {/* LEFT ARROW / MENU */}
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={toggleLeft}
                style={tw`rounded-full`}
              >
                <View
                  style={tw`w-11 h-11 rounded-full bg-red-500 items-center justify-center shadow`}
                >
                  <Icon
                    name={leftOpen ? 'chevron-back-outline' : 'menu-outline'}
                    size={22}
                    color="#fff"
                  />
                </View>
              </TouchableOpacity>

              {/* RIGHT ARROW / NOTIFICATIONS */}
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={toggleRight}
                style={tw`rounded-full`}
              >
                <View
                  style={tw`w-11 h-11 rounded-full bg-red-500 items-center justify-center shadow`}
                >
                  <Icon
                    name={
                      rightOpen ? 'close-outline' : 'notifications-outline'
                    }
                    size={22}
                    color="#fff"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
