import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import tw from 'twrnc';
import { TicketDetailsProps } from '../../../navigation/types';

export default function TicketDetails({ route, navigation }: TicketDetailsProps) {
  const { ticket } = route.params;

  return (
    <ScrollView style={tw`flex-1 bg-[#0b0820]`} contentContainerStyle={tw`p-5`}>
      <Image
        source={{ uri: ticket.coverImage }}
        style={tw`w-full h-60 rounded-xl mb-4`}
      />
      <Text style={tw`text-white text-2xl font-bold mb-2`}>
        {ticket.title}
      </Text>
      <Text style={tw`text-[#FF8A3D] mb-3`}>{ticket.date}</Text>
      <Text style={tw`text-white mb-2`}>Ticket Code: {ticket.code}</Text>

      <Text style={tw`text-white/80`}>
        This ticket grants you access to the event. Please bring a valid ID and
        this digital ticket for entry. Tap “Download” to save a copy offline.
      </Text>
    </ScrollView>
  );
}
