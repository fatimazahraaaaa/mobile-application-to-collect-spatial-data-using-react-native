import React, { useState } from 'react';
import {StyleSheet, TouchableOpacity,Text, View, TextInput, Button, SafeAreaView } from 'react-native';
import * as SQLite from 'expo-sqlite';
//import Mytextinput from './components/Mytextinput';
///import Mybutton from './components/Mybutton';

const db = SQLite.openDatabase('test.db');

const ViewUser = () => {
  let [inputUserId, setInputUserId] = useState('');
  let [userData, setUserData] = useState({});

  let searchUser = () => {
    console.log(inputUserId);
    setUserData({});
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user where user_contact = ?',
        [inputUserId],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            setUserData(results.rows.item(0));
          } else {
            alert('Non trouvé');
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytextinput
            placeholder="Entrer le type du POI"
            onChangeText={(inputUserId) => setInputUserId(inputUserId)}
            style={{ padding: 10 }}
          />
          <Mybutton title="Rechercher" customClick={searchUser} />
          <View style={{ marginLeft: 35, marginRight: 35, marginTop: 10 }}>
            <Text>Id: {userData.user_id}</Text>
            <Text>Nom du POI: {userData.user_name}</Text>
            <Text>Type du POI: {userData.user_contact}</Text>
            <Text>Adresse du POI: {userData.user_address}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};



  
  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: '#f05555',
      color: '#ffffff',
      padding: 10,
      marginTop: 16,
      marginLeft: 35,
      marginRight: 35,
    },
    text: {
      color: '#ffffff',
    },
  });



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
      backgroundColor: 'lightblue',
      color: '#ffffff',
      padding: 10,
      marginTop: 20,
      marginLeft: 35,
      marginRight: 35,
      borderRadius: 10,
    },
    text: {
      color: '#ffffff',
    },
  });

  const Mytextinput = (props) => {
    return (
      <View
        style={{
          marginLeft: 1,
          marginRight: 1,
          marginTop: 10,
          borderColor: 'white',
          borderWidth: 1,
        }}>
        <TextInput
          underlineColorAndroid="transparent"
          placeholder={props.placeholder}
          placeholderTextColor='lightblue'
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
  
export default ViewUser;