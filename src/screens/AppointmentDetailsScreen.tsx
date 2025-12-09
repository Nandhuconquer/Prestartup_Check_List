// src/screens/AppointmentDetailsScreen.tsx
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import tw from 'twrnc';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'AppointmentDetails'>;

const AppointmentDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { appointment } = route.params;

  return (
    <SafeAreaView style={tw`flex-1 bg-[#0b0820]`}>
      {/* header */}
      <View style={tw`px-4 pt-3 pb-2 flex-row items-center`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={tw`text-2xl text-white`}>‹</Text>
        </TouchableOpacity>
        <Text style={tw`flex-1 text-center text-lg font-semibold text-white`}>
          Appointment Details
        </Text>
        <View style={tw`w-6`} />
      </View>

      <ScrollView
        style={tw`flex-1`}
        contentContainerStyle={tw`px-4 pb-8 pt-2`}
      >
        <View style={tw`bg-white rounded-3xl p-5`}>
          {/* avatar + name */}
          <View style={tw`items-center mb-4`}>
            <Image
              source={{ uri: appointment.avatar }}
              style={tw`w-20 h-20 rounded-full mb-2`}
            />
            <Text style={tw`text-xl font-semibold text-[#222]`}>
              {appointment.name}
            </Text>
            <Text style={tw`text-xs text-[#777] mt-1`}>
              {appointment.subtitle}
            </Text>
          </View>

          {/* info */}
          <View style={tw`mt-2`}>
            <Text style={tw`text-xs font-semibold text-[#999] mb-1`}>
              DATE
            </Text>
            <Text style={tw`text-base text-[#333] mb-3`}>
              {appointment.date}
            </Text>

            <Text style={tw`text-xs font-semibold text-[#999] mb-1`}>
              TIME
            </Text>
            <Text style={tw`text-base text-[#333] mb-3`}>
              {appointment.time}
            </Text>

            <Text style={tw`text-xs font-semibold text-[#999] mb-1`}>
              STATUS
            </Text>
            <Text style={tw`text-base text-[#333] mb-3`}>
              {appointment.status}
            </Text>
          </View>

          {/* actions */}
          <View style={tw`flex-row mt-4`}>
            <TouchableOpacity
              style={tw`flex-1 mr-2 h-11 rounded-full border border-red-400 items-center justify-center`}
              onPress={() => {
                console.log('Cancel from details', appointment.id);
                navigation.goBack();
              }}
            >
              <Text style={tw`text-sm font-medium text-red-400`}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`flex-1 ml-2 h-11 rounded-full bg-red-500 items-center justify-center`}
              onPress={() => {
                console.log('Reschedule from details', appointment.id);
                navigation.goBack();
              }}
            >
              <Text style={tw`text-sm font-medium text-white`}>
                Reschedule
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppointmentDetailsScreen;
