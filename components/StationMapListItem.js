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
      <Card style={[ styles.container, this.props.style ]} onPress={this._onPress}>
        <CardItem header>
          <Text>{this.props.title}</Text>
        </CardItem>
        <CardItem>
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
    width: 300,
    marginLeft: 10,
    marginRight: 10,
  }
});


export default StationMapListItem;
