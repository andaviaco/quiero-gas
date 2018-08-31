import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { MapView, Location, Permissions } from 'expo';

import api from './api';


export default class App extends React.Component {
  constructor() {
    super()

    this.state = {
      location: {
        latitude: 20.659698,
        longitude: -103.349609,
      }
    };
  }

  componentWillMount() {
    this._getLocationAsync()
      .then(() => this._loadNearStations(this.state.location));
  }

  async _loadNearStations({ latitude: lat, longitude: lng }) {
    const stations = await api.getStations({ lat, lng });

  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status === 'granted') {
      let { coords } = await Location.getCurrentPositionAsync({});

      this.setState({ location: coords });
    } else {
      console.log('Permission not granted');
    }
  };

  handleBestDealPress() {
    console.log('Kaka');
  }

  render() {
    const { state } = this;

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: state.location.latitude,
            longitude: state.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <MapView.Marker
            coordinate={{
              latitude: state.location.latitude,
              longitude: state.location.longitude
            }}
            title={'Tu ubicación'}
          />
        </MapView>

        <Button
          onPress={this.handleBestDealPress}
          title='Mejor Precio'
          color='#841584'
          accessibilityLabel='Mostrar estación con mejor precio'
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
    justifyContent: 'flex-end',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
