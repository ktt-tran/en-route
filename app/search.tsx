import GoButton from "@/src/components/search/GoButton";
import { useSearch } from "@/src/features/search/useSearch";
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";


export default function SearchPage(){

  const [query, setQuery] = useState("");

  const {
    results,
    loading,
    error,
  } = useSearch(query);

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

        <ScrollView className="mt-15">
          { results.map((result) => (
            <Pressable key={`${result.coordinate.latitude}-${result.coordinate.longitude}`} className="py-12 border-b border-[#ddd]"
              onPress={() => {
                //router.back();
              }}
            >
              <Text className="text-16 font-semibold">{result.name}</Text>

              <Text>{result.address.formatted}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    
    {query.length == 0 && <GoButton />}
    </View>

  );

}