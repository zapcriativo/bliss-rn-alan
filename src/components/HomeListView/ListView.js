import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList, SafeAreaView } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';

import api from '../../helper/api'
import ItemView from './ItemView'

const ListView = (props) => {

  const [search, setSearch] = useState('');
  const [filteredData, setfilteredData] = useState([]);
  const [masterData, setmasterData] = useState([]);

  useEffect(() => {
    api.get("/questions?limit=10&offset=10&filter=filter")
      .then(function (response) {
        console.log(response.data.length)
        setfilteredData(response.data);
        setmasterData(response.data);
      })
      .catch((error) => console.debug(error))
  }, []);

  const searchFunction = (text) => {
    if (text) {
      // Filter the masterData and Update filteredData
      const newData = masterData.filter(function (item) {
        const itemData = item.question
          ? item.question.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilteredData(newData);
      setSearch(text);
    } else {
      // Inserted text is blank and Update filteredData with masterData
      setfilteredData(masterData);
      setSearch(text);
    }
  };

  const ItemSeparator = () => {
    return (
      // Flat List Item Separator
      <View style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }} />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.question);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <SearchBar
          round
          onChangeText={(text) => searchFunction(text)}
          onClear={(text) => searchFunction('')}
          placeholder="Search here ..."
          value={search}
          inputContainerStyle={styles.SearchBarInputContainerStyle}
          containerStyle={styles.inputContainerStyles}
          placeholderTextColor={'#fff'}
          searchIcon={
            <Icon
              name='search'
              type='font-awesome'
              color='#fff'
              size={20}
              iconStyle={{ marginLeft: 2, marginTop: -1 }}
            />
          }
        />
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => <ItemView item={item} navigation={props.navigation} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  inputContainerStyles: {
    backgroundColor: '#535CF7',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  SearchBarInputContainerStyle: {
    backgroundColor: '#535CF7',
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#fff',
    color: '#fff'
  }
});

export default ListView;