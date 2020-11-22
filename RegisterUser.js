import React, { useState , useEffect } from 'react';
import {  View } from 'react-native';
import Picker from 'react-native-community/Picker';
import {
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet
} from 'react-native';
import * as SQLite from 'expo-sqlite';
//import Mytextinput from './components/Mytextinput';
//import Mybutton from './components/Mybutton';
//import Mytext from './components/Mytext';
import * as Location from 'expo-location';
const db = SQLite.openDatabase('test.db');
const image = { uri: "https://i1.wp.com/www.wwhf.org/wp-content/uploads/2014/04/map-background.jpg?ssl=1" };
export default function RegisterUser({navigation}) {
  let [userName, setUserName] = useState('');
  let [userContact, setUserContact] = useState('');
    const [location, setLocation] = useState(null);
    const [geocode, setGeocode] = useState(null);
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
        }
  
        let location = await Location.getCurrentPositionAsync({});
        let geocode = await Location.reverseGeocodeAsync(location.coords);
        setLocation(location);
        setGeocode(geocode);
      })();
    });
    let text = 'Waiting..';
    let text1= 'Waiting..';
    text = JSON.stringify(location);
    text1 = JSON.stringify(geocode);
    
  let register_user = () => {
    console.log(userName, userContact);
    if (!userName) {
      alert('Entrer le nom du POI SVP!');
      return;
    }
    if (!userContact) {
      alert('Entrer le type du POI SVP!');
      return;
    }
    
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_user (user_name, user_contact,user_address) VALUES (?,?,?)',
        [userName, userContact ,text1],
        (tx, results) => {
          console.log('Résultats', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Ajout avec succès',
              'Merci pour votre contribution',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('GeoMobile'),
                },
              ],
              { cancelable: false }
            );
          } else alert("Echec de l'ajout du POI");
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
      <ImageBackground source={image} style={styles.image}>
      
        <View style={styles.container}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'center' }}>
              <Mytextinput
                placeholder="Entrer le nom du POI"
                onChangeText={(userName) => setUserName(userName)}
                style={{ padding: 12 }}
              />
              <Text>  
              </Text>
              
              <Text style={styles.text}>Saisissez un type de ton POI:</Text>
                  
              <Picker
          selectedValue={userContact}
          onValueChange={userContact => setUserContact(userContact)}
          style={{height: 90, width: 280, color: 'black'}}
          mode="dropdown">
          <Picker.Item label="Contrôle routier" value="Contrôle routier"/>
          <Picker.Item label="Gare routière" value="Gare routière" />
        </Picker>
              
              <Mybutton title="Enregistrer" customClick={register_user} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </ImageBackground>

      </View>
    </SafeAreaView>
  );
};

  
  const styles = StyleSheet.create({
    
    text: {
      color: 'black',
      fontSize:18,
      textDecorationLine:'underline',
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    container: {
      flex: 1,
      paddingTop: 40,
      alignItems: "center"
    }
  });
  const Mytextinput = (props) => {
    return (
      <View
        style={{
          marginLeft: 1,
          marginRight: 1,
          marginTop: 10,
          borderColor: 'white',
          borderWidth: 2,
        }}>
        <TextInput
          underlineColorAndroid="transparent"
          placeholder={props.placeholder}
          placeholderTextColor='gray'
          keyboardType={props.keyboardType}
          onChangeText={props.onChangeText}
          returnKeyType={props.returnKeyType}
          numberOfLines={props.numberOfLines}
          multiline={props.multiline}
          onSubmitEditing={props.onSubmitEditing}
          style={props.style}
          blurOnSubmit={false}
          value={props.value}
        />
      </View>
    );
  };

const Mybutton = (props) => {
  return (
    <TouchableOpacity style={styless.button} onPress={props.customClick}>
      <Text style={styless.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styless = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'dimgray',
    color: '#ffffff',
    padding: 10,
    marginTop: 120,
    marginLeft: 35,
    marginRight: 35,
    borderRadius: 10,
  },
  text: {
    color: '#ffffff',
  },
});


//export default RegisterUser