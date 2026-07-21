import {
    Pressable,
    Text,
    TextInput,
    View
} from "react-native";

import { router } from "expo-router";


export default function SearchPage(){

  return (

    <View style={{
      flex:1,
      padding:20,
      gap:20
    }}>


      <Text>
        Search Destination
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

  );

}