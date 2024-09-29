import {View, Text, FlatList, Pressable, Image} from "react-native";
import React from "react";
import {GalleryPreviewData} from "@/constants/AffirmationCategory";
import {Link} from "expo-router";

interface GuidedAffirmationsGalleryProps {
  title: string;
  previws: GalleryPreviewData[];
}

export default function GuidedAffirmationsGallery({
  title,
  previws,
}: GuidedAffirmationsGalleryProps) {
  return (
    <View className="my-5">
      <View className="mb-2">
        <Text className="text-xl font-bold text-white">{title}</Text>
      </View>
      <View className="space-y-2">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={previws}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <Link href={`/affirmations/${item.id}`} asChild>
              <Pressable>
                <View className="w-32 mr-4 rounded-md h-36">
                  <Image
                    source={item.image}
                    resizeMode="cover"
                    className="w-full h-full"
                  />
                </View>
              </Pressable>
            </Link>
          )}
        />
      </View>
    </View>
  );
}
