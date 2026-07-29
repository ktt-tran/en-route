import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";


export default function TripDetails(){

  const {id}=useLocalSearchParams();


  return (

    <View style={{
      flex:1,
      padding:20
    }}>

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

  );

}