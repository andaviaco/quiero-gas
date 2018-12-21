import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MapView, Location, Permissions } from 'expo';
import { Text, Button } from 'native-base';

import { PriceMarker, StationMapList } from './components';

import api from './api';


export default class App extends React.Component {
  constructor() {
    super()

    this.state = {
      isReady: false,
      location: {
        latitude: 20.659698,
        longitude: -103.349609,
      },
      stations: [],
    };
  }

  async componentWillMount() {
    await this._loadFonts();
    await this._getLocationAsync();

    this._loadNearStations(this.state.location);
  }

  async _loadNearStations({ latitude: lat, longitude: lng }) {
    const stations = await api.getStations({ lat, lng });
    const filtered = stations.filter(s => !!s.prices.regular);

    this.setState({ stations: filtered });
  }

  async _loadFonts() {
    const res = await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })

    this.setState({isReady:true});

    return res
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

  _onPriceSortPress = () => {
    console.log('sorting by price');

    const stations = [...this.state.stations];

    stations.sort((a, b) => {
      if (a.prices.regular.price < b.prices.regular.price) {
        return -1;
      }
      if (a.prices.regular.price > b.prices.regular.price) {
        return 1;
      }

      return 0;
    });

    this.setState({ stations });
  }

  _onDistanceSortPress = () => {
    console.log('sorting by distance');

    const stations = [...this.state.stations];

    stations.sort((a, b) => {
      if (a.distance < b.distance) {
        return -1;
      }
      if (a.distance > b.distance) {
        return 1;
      }

      return 0;
    });

    this.setState({ stations });
  }

  renderStationMarkers(stations) {
    return stations.map(({ _id, name, location, prices }) => (
      <PriceMarker
        key={`${_id}'_'${Date.now()}`}
        coordinate={{
          longitude: location.coordinates[0],
          latitude: location.coordinates[1],
        }}
        title={name}
        amount={prices.regular && prices.regular.price || 'N/A'}
      />
    ));
  }

  render() {
    const { state } = this;

    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }

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

          { this.renderStationMarkers(state.stations) }
        </MapView>

        <View style={{alignSelf: 'flex-end', flexDirection: 'row'}}>
          <Button
            style={{ alignSelf: 'flex-end'}}
            rounded
            info
            onPress={this._onDistanceSortPress}
          >
            <Text>Por Distancia</Text>
          </Button>

          <Button
            style={{ alignSelf: 'flex-end'}}
            rounded
            success
            onPress={this._onPriceSortPress}
          >
            <Text>Por Precio</Text>
          </Button>
        </View>

        <StationMapList
          data={state.stations}
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
