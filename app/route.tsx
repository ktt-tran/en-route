import EndButton from "@/src/components/route/EndButton";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";


export default function TripRoute(){
  const {id}=useLocalSearchParams();

  return (
    <View className="flex-1 relative bg-white">
      
      <View className="p-5">
        <Text className="mt-12 text-3xl text-end font-bold mb-5">
          Your Trip
        </Text>


        <Text>
          Trip #{id}
        </Text>


        <Text>
          Route Details
        </Text>


        <Text>
          Distance: -- 
        </Text>


        <Text>
          ETA: --
        </Text>
      </View>

      <EndButton />
    </View>

  );

}