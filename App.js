import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { MapView, Location, Permissions } from 'expo';

export default class App extends React.Component {
  componentWillMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status === 'granted') {
      let location = await Location.getCurrentPositionAsync({});
      console.log('LOCATION', location);

      this.setState({ location });
    } else {
      console.log('Permission not granted');
    }
  };

  handleBestDealPress() {
    console.log('Kaka');
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />

        <Button
          onPress={this.handleBestDealPress}
          title="Mejor Precio"
          color="#841584"
          accessibilityLabel="Mostrar estación con mejor precio"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
