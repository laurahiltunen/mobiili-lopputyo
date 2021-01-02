import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('coursedb.db');

function SavedScreen({ route }) {

  const [list, setList] = useState([]);

  // tietokanta
   //avaa tai luo uuden tietokannan
   useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists reseptit (id integer primary key not null, title text, href text, ingredients text);');
    });
    updateList();    
}, []);


//päivittää tietokannan
const updateList = () => {
    db.transaction(tx => {
        tx.executeSql('select * from reseptit;', [], (_, { rows }) =>
        setList(rows._array)
        ); 
    });
}

// Poistaa reseptin
const deleteItem = (id) => {
  db.transaction(
    tx => {
      tx.executeSql(`delete from reseptit where id = ?;`, [id]);
    }, null, updateList
  )    
}

//resepti
  const alert = (item) => {
    Alert.alert(
      "Reseptin " + item.title + " ainekset",
      "- Heat 3 tablespoons oil in heavy large skillet over medium-low heat. \n- Add onions; sauté until golden, about 20 minutes. \n- Add garlic and sauté 4 minutes. \n- Set aside.",
      [
        
        { text: "OK", onPress: () => console.log("Cancel Pressed") }
      ],
      { cancelable: false }
    );
  }


  const listSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            padding: 1,
            width: "90%",
            backgroundColor: "#CED0CE",
            marginLeft: "1%",
            paddingTop:  3
          }}
        />
      );
    };

  return (
    <View style={styles.container}>

      <View style = {{
        backgroundColor: '#fff',
        flex: 1,
      }}>
        <View style = {{
          backgroundColor: 'yellowgreen',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        </View>

        <View style = {{
          backgroundColor: '#fff',
          flex: 10,
          justifyContent: 'space-evenly',
          alignItems: 'center'
        }}>
          
          <FlatList 
              style={{marginLeft : "5%"}}
              keyExtractor={item => item.id.toString()} 
              ItemSeparatorComponent={listSeparator} 
              data={list}
              renderItem={({item}) => {
                  return (
                      <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                        <Text>{item.title}</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                        <Icon
                          raised
                          name='trash-2'
                          type='feather'
                          color='red'
                          onPress={() => deleteItem(item.id)}
                        />
                        <Icon
                          raised
                          name='file-text'
                          type='feather'
                          color='dodgerblue'
                          onPress={() => alert(item)}
                        />
                        </View>
                      
                          
                        
                      </View>
                  );
              }}
          />              
        </View>

        <View style = {{
            backgroundColor: 'yellowgreen',
            flex: 2,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
        </View>
      
      </View>
    </View>
  );
}

export default SavedScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
  });