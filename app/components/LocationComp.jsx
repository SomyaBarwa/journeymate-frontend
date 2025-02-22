import React, {useContext} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { LocationContext } from '../context/LocationContext';

export default function LocationComp() {

  const { speed, locationError } = useContext(LocationContext);

  return (
    <View style={styles.container}>
      {locationError && <Text style={styles.errorText}>{locationError}</Text>}
      {speed !== null && !locationError && (
        <Text style={styles.speedText}>Speed: {speed.toFixed(2)} m/s</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 100,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 8,
  },
  speedText: {
    color: 'white',
    fontSize: 30,
  },
  errorText: {
    color: 'red',
    fontSize: 30,
  },
});
