import  React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, FlatList, Image } from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('coursedb.db');


function RecipeScreen({navigation}) {

    const [desc, setDesc] = useState('');
    const [recipe, setRecipes] = useState([]);
    //tallennus
    const [list, setList] = useState([]);
    

    //avaa tai luo uuden tietokannan
    useEffect(() => {
        db.transaction(tx => {
          tx.executeSql('create table if not exists reseptit (id integer primary key not null, title text, href text);');
        });
        updateList();    
    }, []);

    //tallentaa tietokantaan
    const saveItem = (title, href) => {
        db.transaction(tx => {
            tx.executeSql('insert into reseptit (title, href) values (?, ?);', [title, href]);    
          }, null, updateList
        )
    }

    //päivittää tietokannan
    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from reseptit;', [], (_, { rows }) =>
            setList(rows._array)
            ); 
        });
        console.log(list);
    }

    

    const getRecipes= () => {
        const url = 'http://www.recipepuppy.com/api/?i=' + desc;
        
        fetch(url)
        .then((response) => response.json())
        .then((data) => { 
            setRecipes(data.results);
        });
    }

  const listSeparator = () => {
        return (
            <View
                style={{
                height: 1,
                padding: 0.1,
                width: "100%",
                backgroundColor: "yellowgreen",
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
                    justifyContent: 'space-evenly',
                    flexDirection: 'row',
                    
                }}>
                    <TextInput 
                        value={desc} 
                        placeholder="Etsi reseptejä"
                        onChangeText={(desc) => setDesc(desc)} 
                    />
                    <Button raised title="Etsi" onPress={getRecipes} />
                </View>

                <View style = {{
                    backgroundColor: '#fff',
                    flex: 6,
                    justifyContent: 'space-evenly',
                    alignItems: 'center'
                }}>
                    <FlatList 
                        style={{marginLeft : "5%"}}
                        keyExtractor={item => item.id} 
                        ItemSeparatorComponent={listSeparator}
                        data={recipe} 
                        renderItem={({item}) => {
                            return (
                                <View>
                                <Text> {item.title} </Text>
                                <View style={{flexDirection: 'row', justifyContent: 'space-around',}}>
                                <Image
                                    style= {{height: 50, width: 50}}
                                    source= {{ uri: `${item.thumbnail}`}}
                                /> 
                                
                                <Icon
                                    raised
                                    name='bookmark'
                                    type='feather'
                                    color='green'
                                    onPress={() => saveItem(item.title, item.href)}
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
                    <Button raised title= "Omat reseptit" onPress={() => navigation.navigate('Tallennetut reseptit')}
                    />

                </View>
            
            </View>

        </View>
    );
}

export default RecipeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

  });