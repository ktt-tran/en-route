import React from "react";
import { Text, View } from "react-native";
import { InfoCardProp } from "./Card.types";

export default function InfoCard({TOTAL_DISTANCE, TOTAL_DURATION}: InfoCardProp) {
    const minutes = Math.round(TOTAL_DURATION / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;   
    return (
        <View className="flex-row gap-3 mb-6">
          <View className="flex-1 bg-white rounded-2xl p-4 shadow-md">
            <Text className="text-xs font-medium text-gray-400 uppercase mb-1">
              Distance
            </Text> 
            <Text className="text-2xl font-bold text-slate-900">
              {TOTAL_DISTANCE.toFixed(1)}
              <Text className="text-base font-semibold text-gray-400"> mi</Text>
            </Text>
          </View>

          <View className="flex-1 bg-white rounded-2xl p-4 shadow-xl">
            <>
              <Text className="text-xs font-medium text-gray-400 uppercase mb-1">
                Time
              </Text>
              <Text className="text-2xl font-bold text-slate-900">
                {hours > 0 && (
                  <>
                    {hours}
                    <Text className="text-base font-semibold text-gray-400"> h </Text>
                  </>
                )}
                {remainingMinutes}
                <Text className="text-base font-semibold text-gray-400"> min</Text>
              </Text>
            </>
          </View> 
        </View>
    );
}