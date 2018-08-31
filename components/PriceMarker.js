import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapView} from 'expo';


export default function PriceMarker({ amount, style, ...props }) {
  return (
    <MapView.Marker {...props} style={styles.test}>
      <View style={[styles.container, style]}>
        <View style={styles.bubble}>
          <Text>${amount}</Text>
        </View>
        <View style={styles.arrowBorder} />
        <View style={styles.arrow} />
      </View>
    </MapView.Marker>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  test: {
  },
  bubble: {
    flex: 0,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#82E571',
    borderRadius: 3,
    borderColor: '#3DC624',
    borderWidth: 0.5,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 4,
    borderTopColor: '#3DC624',
    marginTop: -0.5,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 4,
    borderTopColor: '#82E571',
    marginTop: -9,
  }
});
