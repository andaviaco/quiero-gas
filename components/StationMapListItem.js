import React from 'react';
import { StyleSheet, Linking } from 'react-native';
import { Card, CardItem, Text, Body, Button } from 'native-base';
import qs from 'query-string';


const GOOGLE_MAPS_API = 'https://www.google.com/maps/dir/?api=1';

class StationMapListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  _onDirectionsPress = () => {
    const params = qs.stringify({
      destination: this.props.address,
    });

    Linking.openURL(`${GOOGLE_MAPS_API}&${params}`);
  }

  render() {
    const textColor = this.props.selected ? "red" : "black";

    return (
      <Card
        style={[ styles.container, this.props.style ]}
        onPress={this._onPress}
      >
        <CardItem
          header
          style={styles.header}
        >
          <Text>{this.props.title}</Text>
        </CardItem>
        <CardItem style={styles.body}>
          <Body>
            <Text>
              Regular {this.props.prices.regular.price}
            </Text>
            <Text>
              Distancia {this.props.distance.toFixed(2)} M
            </Text>
          </Body>
        </CardItem>
        <CardItem footer>
          <Button
            transparent
            info
            onPress={this._onDirectionsPress}
          >
            <Text>Ver ruta</Text>
          </Button>
        </CardItem>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    width: 250,
    marginLeft: 5,
    marginRight: 5,
  },
  header: {
    marginBottom: 0,
    paddingBottom: 0,
  },
  body: {
    marginBottom: 0,
    paddingBottom: 0,
  },
});


export default StationMapListItem;
