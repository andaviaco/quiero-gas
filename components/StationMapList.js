import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import StationMapListItem from './StationMapListItem';


class StationMapList extends React.PureComponent {
  state = {
    selected: null,
  };

  _onPressItem = (id) => {
    this.setState({ selected: id });
  };

  _keyExtractor = (item) => item._id;

  _renderItem = ({ item, index }) => {
    const lastPos = this.props.data.length - 1;
    const style = index === 0 && styles.firstItem || index === lastPos && styles.lastItem;

    return (
      <StationMapListItem
        style={style}
        id={item._id}
        onPressItem={this._onPressItem}
        selected={this.state.selected === item._id}
        title={item.addressStreet}
        prices={item.prices}
        distance={item.distance}
      />
    )
  };

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
    height: 150,
  },
  firstItem: {
    marginLeft: 40,
  },
  lastItem: {
    marginRight: 40,
  },
});


export default StationMapList;
