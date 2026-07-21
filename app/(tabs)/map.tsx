import {
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native";

import { router } from "expo-router";


export default function MapScreen() {

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        En Route
      </Text>


      <View style={styles.mapPlaceholder}>
        <Text>
          Map View
        </Text>
      </View>


      <Pressable
        style={styles.button}
        onPress={() => router.push("/search")}
      >
        <Text style={styles.buttonText}>
          Search Destination
        </Text>
      </Pressable>


    </View>
  );
}


const styles = StyleSheet.create({

  container:{
    flex:1,
    padding:20,
    gap:20
  },

  title:{
    fontSize:28,
    fontWeight:"bold"
  },

  mapPlaceholder:{
    flex:1,
    backgroundColor:"#ddd",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:20
  },

  button:{
    backgroundColor:"black",
    padding:18,
    borderRadius:12,
    alignItems:"center"
  },

  buttonText:{
    color:"white",
    fontWeight:"bold"
  }

});