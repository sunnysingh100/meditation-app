import {View, Text, ImageBackground, Pressable} from "react-native";
import {useEffect, useState} from "react";
import MEDITATION_IMAGES from "@/constants/meditation-images";
import AppGradient from "@/components/AppGradient";
import {router, useLocalSearchParams} from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomButton from "@/components/CustomButton";
import {Audio} from "expo-av";
import {AUDIO_FILES, MEDITATION_DATA} from "@/constants/MeditaionData";
import useTimerStore from "@/store/useTimerStore";

export default function Meditate() {
  const {id} = useLocalSearchParams();
  const [isMeditating, setIsMeditating] = useState(false);
  const [audioSound, setSound] = useState<Audio.Sound>();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const {duration, setDuration} = useTimerStore();

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    // Exit early when we reach 0
    if (duration === 0) {
      if (isPlayingAudio) audioSound?.pauseAsync();
      setIsMeditating(false);
      setIsPlayingAudio(false);
      return;
    }

    if (isMeditating) {
      // Save the interval ID to clear it when the component unmounts
      timerId = setTimeout(() => {
        setDuration(duration - 1);
      }, 1000);
    }

    // Clear timeout if the component is unmounted or the time left changes
    return () => {
      clearTimeout(timerId);
    };
  }, [duration, isMeditating]);

  useEffect(() => {
    return () => {
      setDuration(10);
      audioSound?.unloadAsync();
    };
  }, [audioSound, setDuration]);

  const toggleMeditationStatus = async () => {
    if (duration === 0) setDuration(10);

    setIsMeditating(!isMeditating);
    await toggleSound();
  };
  const initializeSound = async () => {
    const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;

    const {sound} = await Audio.Sound.createAsync(AUDIO_FILES[audioFileName]);
    setSound(sound);
    return sound;
  };
  const toggleSound = async () => {
    const sound = audioSound ? audioSound : await initializeSound();

    const status = await sound.getStatusAsync();
    if (status?.isLoaded && !isPlayingAudio) {
      await sound.playAsync();
      setIsPlayingAudio(true);
    } else {
      await sound.pauseAsync();
      setIsPlayingAudio(false);
    }
  };

  // format the time left to ensure two digits are displayed

  const formattedMinutes = String(Math.floor(duration / 60)).padStart(2, "0");
  const formattedSeconds = String(duration % 60).padStart(2, "0");

  const handleAdjustDuration = () => {
    if (isMeditating) toggleMeditationStatus();
    router.push("/(modal)/adjust-meditation-duration");
  };

  return (
    <View className="flex-1">
      <ImageBackground
        source={MEDITATION_IMAGES[Number(id) - 1]}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient colors={["transparent", "rgba(0,0,0,0.8)"]}>
          <Pressable
            onPress={() => router.back()}
            className="absolute z-10 top-16 left-6"
          >
            <AntDesign name="leftcircleo" size={50} color="white" />
          </Pressable>
          <View className="justify-center flex-1">
            <View className="items-center justify-center mx-auto rounded-full bg-neutral-200 w-44 h-44">
              <Text className="text-4xl text-blue-800 font-rmono">
                {formattedMinutes}:{formattedSeconds}
              </Text>
            </View>
          </View>
          <View className="mb-6">
            <CustomButton
              title="Adjust Duration"
              onPress={handleAdjustDuration}
            />
            <CustomButton
              title={isMeditating ? "Stop" : "Start Meditation"}
              onPress={toggleMeditationStatus}
              containerStyles="mt-4"
            />
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  );
}
