import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen.js';
import RegisterUser from './RegisterUser.js';
import ViewUser from './ViewUser.js';
import ViewAllUser from './ViewAllUser.js';




const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="GeoMobile"
          component={HomeScreen}
          options={{
            title: "Bienvenue à l'application GeoMobile", //Set Header Title
            headerStyle: {
              backgroundColor: 'black', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold',  //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Afficher"
          component={ViewUser}
          options={{
            title: 'Afficher', //Set Header Title
            headerStyle: {
              backgroundColor: 'black', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Afficher toutes les données enregistrées"
          component={ViewAllUser}
          options={{
            title: 'Afficher toutes les données enregistrées', //Set Header Title
            headerStyle: {
              backgroundColor: 'black', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        
        <Stack.Screen
          name="Ajouter un POI"
          component={RegisterUser}
          options={{
            title: 'Ajouter un POI', //Set Header Title
            headerStyle: {
              backgroundColor: 'black', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;