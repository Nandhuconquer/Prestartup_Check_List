import React from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { ArrowLeftCircle } from 'lucide-react-native';

export const ArrowToggle = ({ open, onPress }: { open: boolean; onPress: () => void }) => {
  const style = useAnimatedStyle(() => ({
    transform: [{ rotate: withTiming(open ? '180deg' : '0deg', { duration: 200 }) }],
  }));

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View style={style}>
        <ArrowLeftCircle size={40} color="#1E90FF" />
      </Animated.View>
    </TouchableOpacity>
  );
};
