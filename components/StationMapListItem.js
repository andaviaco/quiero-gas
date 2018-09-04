import React from 'react';
import { StyleSheet, Linking } from 'react-native';
import { Card, CardItem, Text, Body, Button, Icon, View } from 'native-base';
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
    const { regular, premium } = this.props.prices;
    const distance = Math.ceil(this.props.distance);

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
            <View style={styles.priceContainer}>
              {regular &&
                <View style={styles.price}>
                  <Icon name='logo-usd' style={styles.priceIconRegular}/>
                  <Text style={styles.priceValue}>{regular.price}</Text>
                </View>
              }
              {premium &&
                <View style={styles.price}>
                  <Icon name='logo-usd' style={styles.priceIconPremium}/>
                  <Text>{premium.price}</Text>
                </View>
              }
            </View>
          </Body>
        </CardItem>
        <CardItem footer style={styles.footer}>
          <View style={styles.price}>
            <Icon name='car'/>
            <Text>{distance} M</Text>
          </View>

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
    flex: 1,
    marginBottom: 0,
    paddingBottom: 0,
  },
  body: {
    flex: 1,
    marginBottom: 0,
    paddingBottom: 0,
  },
  footer: {
    flex: 1,
  },
  priceContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceIconRegular: {
    color: '#00ffa2',
  },
  priceIconPremium: {
    color: '#fb4f18',
  },
  priceValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});


export default StationMapListItem;
