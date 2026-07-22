import React from 'react';
import { StyleSheet, View } from 'react-native';

// 👇 THIS IS WHERE YOU IMPORT IT
// The path uses '../../' to climb out of 'app/(tabs)/' and reach the 'components/' folder.
import MapComponent from '../../components/MapComponent';

export default function Map() {
  return (
    <View style={styles.container}>
      {/* Metro renders the native file on phones, and the web file on browsers */}
      <MapComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
