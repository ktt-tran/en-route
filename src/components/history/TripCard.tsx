import React from "react";
import { ScrollView, Text, View } from "react-native";
import { TripRouteCardProps } from "./Card.types";

export default function TripCard({stops}: TripRouteCardProps) {
    return (
        <View
            className="flex-1 bg-white rounded-2xl p-5 shadow-md"
            style={{ maxHeight: "65%" }}
        >
            <Text className="text-lg font-bold text-slate-900 mb-4">
                Route Details
            </Text>

            <ScrollView showsVerticalScrollIndicator={false}>

                {stops.map((stop, index) => {

                    const isFirst = index === 0;
                    const isLast =
                        index === stops.length - 1;

                    const label =
                        stop.label ??
                        (isLast
                            ? "Destination"
                            : `Stop ${index}`);

                    return (
                        <View key={`${stop.name}-${index}`}>

                            <View className="flex-row items-start">

                                <View
                                    className={`w-2.5 h-2.5 rounded-full mt-1.5 mr-3 ${
                                        isFirst
                                            ? "bg-primary"
                                            : isLast
                                            ? "bg-slate-900"
                                            : "bg-gray-300"
                                    }`}
                                />

                                <View className="flex-1 pb-1">

                                    <Text className="text-xs text-gray-400 uppercase font-medium">
                                        {label}
                                    </Text>

                                    <Text className="text-base text-slate-800 mt-0.5">
                                        {stop.name}
                                    </Text>

                                </View>

                            </View>

                            {!isLast && (
                                <View className="flex-row items-center ml-[4px] mb-1">

                                    <View className="w-0.5 h-6 bg-gray-200" />

                                    {stops[index + 1]
                                        .distanceFromPrev != null && (

                                        <Text className="text-xs text-gray-400 ml-3">

                                            {
                                                stops[index + 1]
                                                    .distanceFromPrev
                                            }{" "}
                                            mi ·{" "}

                                            {
                                                stops[index + 1]
                                                    .durationFromPrev
                                            }{" "}
                                            min

                                        </Text>
                                    )}

                                </View>
                            )}

                        </View>
                    );
                })}

            </ScrollView>
        </View>
    );
}