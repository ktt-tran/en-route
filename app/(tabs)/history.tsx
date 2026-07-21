import {
    FlatList,
    Pressable,
    Text,
    View
} from "react-native";

import { router } from "expo-router";


const trips = [
  {
    id:"1",
    destination:"Washington DC",
    date:"Today"
  },
  {
    id:"2",
    destination:"Philadelphia",
    date:"Yesterday"
  }
];


export default function HistoryScreen(){

  return (

    <View style={{
      flex:1,
      padding:20
    }}>

      <Text style={{
        fontSize:28,
        fontWeight:"bold"
      }}>
        Trip History
      </Text>


      <FlatList
        data={trips}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=>(

          <Pressable
            onPress={()=>
              router.push(`/trip/${item.id}`)
            }
            style={{
              padding:20,
              backgroundColor:"#eee",
              marginTop:15,
              borderRadius:12
            }}
          >

            <Text>
              {item.destination}
            </Text>

            <Text>
              {item.date}
            </Text>

          </Pressable>

        )}
      />

    </View>

  );
}