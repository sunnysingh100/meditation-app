import {View, Text, Pressable} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import AppGradient from "@/components/AppGradient";
import {router} from "expo-router";
import CustomButton from "@/components/CustomButton";
import useTimerStore from "@/store/useTimerStore";

export default function AdjustMeditationDuration() {
  const {setDuration} = useTimerStore();
  const handlePress = (seconds: number) => {
    setDuration(seconds);

    router.back();
  };
  return (
    <View className="relative flex-1">
      <AppGradient colors={["#161b2e", "#0a4d4a", "#766e67"]}>
        <Pressable
          onPress={() => router.back()}
          className="absolute z-10 top-10 left-6"
        >
          <AntDesign name="leftcircleo" size={50} color="white" />
        </Pressable>
        <View className="justify-center h-4/5">
          <View>
            <Text className="mb-8 text-3xl font-bold text-center text-white">
              Adjust your meditation duration
            </Text>
          </View>

          <View>
            <CustomButton
              title="10 seconds"
              onPress={() => handlePress(10)}
              containerStyles="mb-5"
            />
            <CustomButton
              title="5 minutes"
              onPress={() => handlePress(5 * 60)}
              containerStyles="mb-5"
            />
            <CustomButton
              title="10 minutes"
              onPress={() => handlePress(10 * 60)}
              containerStyles="mb-5"
            />
            <CustomButton
              title="15 minutes"
              onPress={() => handlePress(15 * 60)}
              containerStyles="mb-5"
            />
          </View>
        </View>
      </AppGradient>
    </View>
  );
}
