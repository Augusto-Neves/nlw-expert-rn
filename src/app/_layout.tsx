import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native';
import { Loading } from '@/components/Loading';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import ToastManager from 'toastify-react-native';
import colors from 'tailwindcss/colors';
import { Host } from 'react-native-portalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  const [fontIsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontIsLoaded) {
    return <Loading />;
  }

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaView className="flex-1 bg-slate-900">
        <Host>
          <ToastManager
            hasBackdrop
            height={90}
            width={300}
            animationStyle="rightInOut"
            textStyle={{
              color: colors.slate[900],
              textAlign: 'center',
            }}
          />
          <Slot />
        </Host>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
