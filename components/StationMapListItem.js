import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

class StationMapListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    const textColor = this.props.selected ? "red" : "black";

    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={styles.container}>
          <Text style={{ color: textColor }}>
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    height: 300,
    marginHorizontal: 5,
  }
});


export default StationMapListItem;
