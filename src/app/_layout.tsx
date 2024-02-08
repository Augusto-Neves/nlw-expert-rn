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
    <SafeAreaView className="flex-1 bg-slate-900">
      <Slot />
    </SafeAreaView>
  );
}
