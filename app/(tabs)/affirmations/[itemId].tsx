import {View, Text, ImageBackground, Pressable, ScrollView} from "react-native";
import React, {useEffect, useState} from "react";
import {router, useLocalSearchParams} from "expo-router";
import {GalleryPreviewData} from "@/constants/models/AffirmationCategory";
import AFFIRMATION_GALLERY from "@/constants/affirmation-gallery";
import AppGradient from "@/components/AppGradient";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function AffirmationPractice() {
  const {itemId} = useLocalSearchParams();
  const [affirmation, setAffirmation] = useState<GalleryPreviewData>();
  const [sentences, setSentences] = useState<string[]>([]);
  useEffect(() => {
    for (let i = 0; i < AFFIRMATION_GALLERY.length; i++) {
      const affirmationsData = AFFIRMATION_GALLERY[i].data;
      const affirmationToStart = affirmationsData.find(
        (affirmation) => affirmation.id == Number(itemId)
      );
      if (affirmationToStart) {
        setAffirmation(affirmationToStart);

        const affirmationArray = affirmationToStart.text.split(".");
        if (affirmationArray[affirmationArray.length - 1] === "") {
          affirmationArray.pop();
        }
        setSentences(affirmationArray);
        return;
      }
    }
  }, []);

  return (
    <View className="flex-1">
      <ImageBackground
        source={affirmation?.image}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.9)"]}>
          <Pressable
            onPress={() => router.back()}
            className="absolute z-10 top-16 left-6"
          >
            <AntDesign name="leftcircleo" size={50} color="white" />
          </Pressable>
          <ScrollView showsVerticalScrollIndicator={false} className="mt-20">
            <View className="justify-center h-full">
              <View className="justify-center h-4/5">
                {sentences.map((sentence, index) => (
                  <Text
                    key={index}
                    className="mb-12 text-3xl font-bold text-center text-white"
                  >
                    {sentence}.
                  </Text>
                ))}
              </View>
            </View>
          </ScrollView>
        </AppGradient>
      </ImageBackground>
    </View>
  );
}
