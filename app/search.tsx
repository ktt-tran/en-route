import GoButton from "@/src/components/search/GoButton";
import { router } from "expo-router";
import { Pressable, Text, TextInput, View } from "react-native";


export default function SearchPage(){

  return (
    <View className="flex-1 relative bg-white">

      <View className="p-5">
        <Text className="mt-20 text-3xl text-primary font-bold mb-5">
          En Route
        </Text>


        <TextInput
          placeholder="Where to?"
          style={{
            borderWidth:1,
            padding:15,
            borderRadius:10
          }}
        />


        <Pressable
          onPress={()=>{
            router.back();
          }}
          style={{
            backgroundColor:"black",
            padding:15,
            borderRadius:10
          }}
        >

          <Text style={{
            color:"white"
          }}>
            Set Destination
          </Text>

        </Pressable>
      </View>

      <GoButton />
    </View>

  );

}