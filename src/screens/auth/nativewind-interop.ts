import { cssInterop } from 'nativewind';
import LinearGradient from 'react-native-linear-gradient';

cssInterop(LinearGradient, {
  className: 'style',
});

const LG = LinearGradient as any;
export default LG;
