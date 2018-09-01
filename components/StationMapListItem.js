import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Card, CardItem, Text, Body } from 'native-base';

class StationMapListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    const textColor = this.props.selected ? "red" : "black";

    return (
      <Card
        style={[ styles.container, this.props.style ]}
        onPress={this._onPress}
      >
        <CardItem header style={styles.header}>
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
          <Text>Ver ruta</Text>
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
