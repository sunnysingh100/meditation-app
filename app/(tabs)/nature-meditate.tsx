import {View, Text, FlatList, Pressable, ImageBackground} from "react-native";
import React from "react";
import AppGradient from "@/components/AppGradient";
import {StatusBar} from "expo-status-bar";
import {MEDITATION_DATA} from "@/constants/MeditaionData";
import MEDITATION_IMAGES from "@/constants/meditation-images";
import {LinearGradient} from "expo-linear-gradient";

export default function NatureMeditate() {
  return (
    <View className="flex-1">
      <AppGradient colors={["#161b2e", "#0a4d4a", "#766e67"]}>
        <View className="mb-6">
          <Text className="mb-3 text-4xl font-bold text-left text-gray-200">
            Welcome Sunny
          </Text>
          <Text className="text-xl font-medium text-indigo-100">
            Start your journey with us
          </Text>
        </View>
        <View className="mb-24">
          <FlatList
            data={MEDITATION_DATA}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
              <Pressable
                className="h-48 my-3 overflow-hidden rounded-md"
                onPress={() => {
                  console.log("pressed");
                }}
              >
                <ImageBackground
                  source={MEDITATION_IMAGES[item.id - 1]}
                  resizeMode="cover"
                  className="justify-center flex-1 rounded-lg"
                >
                  <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.8)"]}
                    className="items-center justify-center flex-1"
                  >
                    <Text className="text-3xl font-bold text-center text-gray-100">
                      {item.title}
                    </Text>
                  </LinearGradient>
                </ImageBackground>
              </Pressable>
            )}
          />
        </View>
      </AppGradient>
      <StatusBar style="light" />
    </View>
  );
}
