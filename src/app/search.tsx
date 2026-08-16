import { useSearch } from "@/src/hooks/useSearch";
import { useNavigationStore } from "@/src/store/navigationStore";
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import SearchControls from "../components/search/SearchControls";
import ShowPreview from "../components/search/ShowPreview";


export default function SearchPage(){
  const [query, setQuery] = useState("");
  const { results, loading, error } = useSearch(query);
  const destination = useNavigationStore(state => state.destination);
  const setDestination = useNavigationStore(state => state.setDestination);
    
  return (
    <View className="flex-1 relative bg-white">
      
      <View className="p-5">
        <Text className="mt-12 text-3xl text-primary font-bold mb-5">
          En Route
        </Text>

        <TextInput
          placeholder="Where to?"
          placeholderTextColor="#000000"
          value={query}
          onChangeText={setQuery}
          style={{
            color:"black",
            borderWidth:1,
            padding:15,
            borderRadius:10
          }}
        />

        { loading && (
          <Text className="mt-10">Searching...</Text>
        )}

        { error && (
          <Text className="text-red mt-10">{error}</Text>
        )}

        { !loading && (
          query.length > 0 && results.length == 0 && (
            <Text className="mt-10">No results found.</Text>
          )
        )}

        <ScrollView className="h-3/4 mt-15">
          {results.map((result) => {
              // console.log("DESTINATION RESULT: ", result);

              const selected =
                  destination?.coordinates.latitude === result.coordinates.latitude &&
                  destination?.coordinates.longitude === result.coordinates.longitude;

              return (
                  <Pressable
                      key={`${result.coordinates.latitude}-${result.coordinates.longitude}`}
                      className={`py-12 border-b border-[#ddd] ${
                          selected ? "bg-gray-200" : "bg-white"
                      }`}
                      onPress={() => {
                          setDestination({
                              name: result.name,
                              coordinates: result.coordinates,
                          });
                      }}
                  >
                    
                      <Text>{result.name}</Text>

                      <Text>{result.address.formatted}</Text>

                  </Pressable>
              );
          })}
        </ScrollView>
      </View>
    
      {destination && <ShowPreview />}
      <SearchControls />
    </View>

  );

}