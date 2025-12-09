// src/navigation/types.ts
import type { NativeStackScreenProps } from '@react-navigation/native-stack';


export type AppointmentStatus = 'Confirmed' | 'Rescheduled' | 'Unconfirmed';

export type AppointmentParam = {
  id: string;
  name: string;
  avatar: string;
  subtitle: string;
  date: string;
  time: string;
  status: AppointmentStatus;
};

// export type RootStackParamList = {
//   Login: undefined;                       // Super Admin login
//   MainTabs: undefined;                   // Bottom tabs
//   AppointmentDetails: { appointment: any }; // refine to Appointment type later
// };



export type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  UserLogin: undefined;
  Appointments: undefined;
  AppointmentDetails: {
    appointment: {
      id: string;
      name: string;
      avatar: string;
      subtitle: string;
      date: string;
      time: string;
      status: string;
    };
  };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

