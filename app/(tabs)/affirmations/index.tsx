import {View, Text, ScrollView} from "react-native";
import React from "react";
import AppGradient from "@/components/AppGradient";
import GuidedAffirmationsGallery from "@/components/GuidedAffirmationsGallery";
import AFFIRMATION_GALLERY from "@/constants/affirmation-gallery";

export default function Affirmations() {
  return (
    <View className="flex-1">
      <AppGradient colors={["#2e1f58", "#54426b", "#a790af"]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className="text-3xl font-bold text-zinc-50">
            Change your beliefs with Affirmations
          </Text>
          <View>
            {AFFIRMATION_GALLERY.map((item) => (
              <GuidedAffirmationsGallery
                key={item.title}
                title={item.title}
                previws={item.data}
              />
            ))}
          </View>
        </ScrollView>
      </AppGradient>
    </View>
  );
}
