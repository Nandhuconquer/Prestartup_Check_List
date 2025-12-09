import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import LG from '../nativewind-interop'; // you can keep gradient as-is or also swap later
import tw from 'twrnc';

const ORANGE = '#FF8A3D';

export interface Ticket {
  id?: string;
  title: string;
  date: string;
  coverImage: string;
  code: string;
}

interface TicketCardProps {
  ticket: Ticket | null | undefined;
  onOpen?: () => void;
  onDownload?: () => void;
}

export default function TicketCard({ ticket, onOpen, onDownload }: TicketCardProps) {
  if (!ticket) return null;

  return (
    <View style={tw`bg-[#0b0820] py-4 w-full`}>
      <View style={tw`bg-[#151233] rounded-2xl overflow-hidden mx-4`}>
        {/* barcode */}
        <View style={tw`px-4 pt-3`}>
          <Svg height={28} width="100%">
            {Array.from({ length: 40 }).map((_, i) => (
              <Line
                key={i}
                x1={i * 5}
                y1={0}
                x2={i * 5}
                y2={28}
                stroke="#ffffff"
                strokeWidth={i % 3 === 0 ? 2 : 1}
                opacity={0.9}
              />
            ))}
          </Svg>
          <View style={tw`flex-row items-center mt-1`}>
            <Text style={tw`text-white text-xs font-medium`}>{ticket.code}</Text>
            <View style={tw`flex-1 ml-2 border-t border-dashed border-white/40`} />
          </View>
        </View>

        {/* main content */}
        <View style={tw`flex-row px-4 py-3`}>
          <Image
            source={{ uri: ticket.coverImage }}
            style={tw`w-20 h-20 rounded-xl mr-3`}
          />
          <View style={tw`flex-1 justify-between`}>
            <View>
              <Text style={tw`text-[11px] text-white/60`}>Event</Text>
              <Text style={tw`text-white text-base font-semibold`}>{ticket.title}</Text>
            </View>

            <View style={tw`mt-2`}>
              <Text style={tw`text-[11px] text-white/60`}>Date & Time</Text>
              <Text style={tw`text-white text-xs`}>{ticket.date}</Text>
            </View>

            <TouchableOpacity
              onPress={onOpen}
              style={[
                tw`self-start mt-2 rounded-full px-3 py-1`,
                { backgroundColor: ORANGE },
              ]}
            >
              <Text style={tw`text-black text-xs font-semibold`}>View Ticket</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* gradient strip */}
        <LG
          className="h-1.5 mx-4 rounded-full mb-2"
          colors={['#FF8A3D', '#FFCD3C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />

        {/* actions */}
        <View style={tw`flex-row justify-between px-4 py-2 border-t border-white/15`}>
          <TouchableOpacity onPress={onOpen}>
            <Text style={tw`text-[11px] text-[#FF8A3D] font-medium`}>
              Show at Registration
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onDownload}>
            <Text style={tw`text-[11px] text-[#FF8A3D] font-medium`}>Download</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
