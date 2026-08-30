import { useSearch } from "@/src/hooks/useSearch";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useRef, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import TripCalculation from "../components/trip/TripCalculation";
import { useTripStore } from "../store/tripStore";
import { generateId } from "../utils/id-generator";

export default function SearchPage(){
  const [query, setQuery] = useState("");
  const isLeavingSearch = useRef(false);
  const { results, loading, error } = useSearch(query);
  const destination = useTripStore((state) => state.destination);
  const checkpoints = useTripStore((state) => state.totalCheckpoints);
  const clearDestination = useTripStore((state) => state.clearDestination);
  const setDestination = useTripStore((state) => state.setDestination);
  const addCheckpoint = useTripStore((state) => state.addCheckpoint);
    
  useFocusEffect(
    useCallback(() => {
      isLeavingSearch.current = false;
      return () => {
        if (!isLeavingSearch.current) { clearDestination(); }
      };
    }, [clearDestination])
  );

  return (
    <View className="flex-1 bg-white">
      
      <View className="p-5 pt-6">
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
      
        { loading && 
          ( <Text className="mt-10">Searching...</Text> )
        } 

        { error && 
          ( <Text className="text-red mt-10">{error}</Text> )
        }

        { !loading && 
          ( query.length > 0 && results.length == 0 && 
          ( <Text className="mt-10">No results found.</Text> ) )
        }

      </View>

        <ScrollView 
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
        >
          {results.map((result) => {

              const selected =
                  destination?.coordinates.latitude === result.coordinates.latitude &&
                  destination?.coordinates.longitude === result.coordinates.longitude;

              const alreadyCheckpoint = checkpoints.some(
                (checkpoint) =>
                  checkpoint.placeId.coordinates.latitude === result.coordinates.latitude &&
                  checkpoint.placeId.coordinates.longitude === result.coordinates.longitude
              );

              return (
                  <View
                      key={`${result.coordinates.latitude}-${result.coordinates.longitude}`}
                      className={`py-12 border-b border-[#ddd]`}
                  >
                    
                      <Text>{result.name}</Text>

                      <Text>{result.address.formatted}</Text>

                        <View className="flex-row mt-4 gap-3">

                            <Pressable
                                className="px-4 py-3 bg-gray-200 rounded-lg"
                                disabled={alreadyCheckpoint}
                                onPress={() => {
                                    addCheckpoint({
                                        id: generateId(),
                                        placeId: {
                                            name: result.name,
                                            coordinates: result.coordinates,
                                        },
                                        order:
                                            checkpoints.length,
                                    });

                                    setQuery("");
                                }}
                            >
                                <Text>
                                    {alreadyCheckpoint
                                        ? "Added"
                                        : "Add Stop"}
                                </Text>
                            </Pressable>

                            <Pressable
                                className="px-4 py-3 bg-gray-200 rounded-lg"
                                onPress={() => {
                                    setDestination({
                                        name: result.name,
                                        coordinates: result.coordinates,
                                    });

                                    setQuery("");
                                }}
                            >
                                <Text>
                                    {selected
                                        ? "Destination"
                                        : "Set Destination"}
                                </Text>
                            </Pressable>

                        </View>

                  </View>
              );
          })}
        </ScrollView>

        <View className="pb-12">
        {/* Trip */}
        
          {destination && (
              <TripCalculation onPreviewRoute={() => {
                isLeavingSearch.current=true;
                router.back();
              }} />
          )}

        </View>

    </View>

  );

}