import {Stack} from "expo-router";
import React from "react";

export default function AffirmationsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}} />
      <Stack.Screen name="[itemId]" options={{headerShown: false}} />
    </Stack>
  );
}
