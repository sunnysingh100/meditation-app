import {View, Text, ImageBackground} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";
import beachImage from "@/assets/meditation-images/beach.webp";
import CustomButton from "@/components/CustomButton";
import {useRouter} from "expo-router";
import AppGradient from "@/components/AppGradient";
export default function HomeScreen() {
  const router = useRouter();
  return (
    <View className="flex-1">
      <ImageBackground
        source={beachImage}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}>
          <SafeAreaView className="flex justify-between flex-1 px-1">
            <View>
              <Text className="text-4xl font-bold text-center text-white">
                Simple Meditation
              </Text>
              <Text className="mt-3 text-2xl text-center text-white">
                Simplifying Meditation for Everyone
              </Text>
            </View>
            <View>
              <CustomButton
                title="Get Started"
                onPress={() => {
                  router.push("/nature-meditate");
                }}
              />
            </View>
            <StatusBar style="light" />
          </SafeAreaView>
        </AppGradient>
      </ImageBackground>
    </View>
  );
}
