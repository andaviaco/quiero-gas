import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

import StationMapListItem from './StationMapListItem';


class StationMapList extends React.PureComponent {
  state = {
    selected: null,
  };

  _onPressItem = (id) => {
    this.setState({ selected: id });
  };

  _keyExtractor = (item) => item._id;

  _renderItem = ({ item }) => {

    return (
    <StationMapListItem
      id={item._id}
      onPressItem={this._onPressItem}
      selected={this.state.selected === item._id}
      title={item.name}
    />
  )};

  render() {
    const { data } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={data}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          horizontal={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: 'lightgreen',
  },
  list: {
    backgroundColor: 'blue',
    paddingVertical: 5,
  },
});


export default StationMapList;
