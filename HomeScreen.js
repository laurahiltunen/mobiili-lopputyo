import * as React from 'react';
import { View, StyleSheet, Vibration } from 'react-native';
import { Button, Text } from 'react-native-elements';


function HomeScreen({ navigation, route }) {
    const list = [];
    
    React.useEffect(() => {
        if (route.params?.post) {
            list = route.params?.post;
            console.log(list);
        }
      }, [route.params?.post]);


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
                    <Text h4 style={{color: "green"}}>Ruokasovellus</Text>
                </View>

                <View style = {{
                backgroundColor: '#fff',
                flex: 2,
                justifyContent: 'space-evenly',
                alignItems: 'center'
                }}>
                    <Button raised
                    title="Etsi reseptejä"
                    onPress={() => navigation.navigate('Reseptihaku')}/>

                    <Button raised title= "Omat reseptit" 
                    onPress={() => navigation.navigate('Tallennetut reseptit', {list})}/>
                    
                
                </View>

                <View style = {{
                backgroundColor: 'yellowgreen',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'

                }}>
                    <Button raised title= "Ravista!" onPress={() => Vibration.vibrate()} />
                </View>
            
            </View>
        </View>
  );
}

export default HomeScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
  });