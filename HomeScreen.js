import React, { useEffect } from 'react';
import {StyleSheet,TouchableOpacity,View, Text, SafeAreaView , Image, ImageBackground} from 'react-native';
import * as SQLite from 'expo-sqlite';

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    const db = SQLite.openDatabase('test.db');
    db.transaction(function (tx) {
      tx.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            tx.executeSql('DROP TABLE IF EXISTS table_user', []);
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
              []); }});});}, []);
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 1 }}>
      <Image
        style={{width: 360, height: 36}}
        source={require('C:/Users/hp/Geo/A.jpeg')} /> 
        <View style={{ flex: 1 }}>
          <Mybutton
            title="Ajouter un POI"
            customClick={() => navigation.navigate('Ajouter un POI')} /> 
          <Mybutton
            title="Recherche"
            customClick={() => navigation.navigate('Afficher')}/>
          <Mybutton
            title="Afficher toutes les données enregistrées"
            customClick={() => navigation.navigate('Afficher toutes les données enregistrées')} />  
        </View>  </View>  </SafeAreaView>);};



  
  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: '#ffffff',
      color: '#ffffff',
      padding: 50,
      marginTop: 40,
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
      backgroundColor: 'lightsteelblue',
      color: '#ffffff',
      padding: 20,
      marginTop: 70,
      marginLeft: 35,
      marginRight: 35,
      borderRadius: 10,
      
    },
    text: {
      color: 'gray',
    },
  }); 


  
export default HomeScreen;