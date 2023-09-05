import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useContext} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Detail from './src/screens/Detail';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Welcome from './src/screens/Welcome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from './src/constants/ColorConstant';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Account from './src/screens/Account';
import {AuthContext, AuthProvider} from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';
import {AuthUser} from './src/model/AuthUserType';
import {GoogleSignin} from '@react-native-community/google-signin';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
// const size=20;
// const color=COLORS.primary

// function MainScreen() {
//   return (
//     <Tab.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
//       <Tab.Screen
//         name="Home"
//         component={Home}
//         options={{
//           tabBarIcon: ({size, color}: {size: number; color: string}) => (
//             <MaterialCommunityIcons name="home" size={size} color={color} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Notification"
//         component={Home}
//         options={{
//           tabBarIcon: ({size, color}: {size: number; color: string}) => (
//             <MaterialCommunityIcons name="home" size={size} color={color} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }
const App = () => {
  //const {auth} = useContext(AuthContext);

  GoogleSignin.configure({
    webClientId:
      '24734469785-hha77ob35t6uf8i0511hiqm1b5g2huac.apps.googleusercontent.com',
  });
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {/* {auth.access_token ? (
            <>
              <Stack.Screen name="Welcome" component={Welcome} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Detail" component={Detail} />
              <Stack.Screen
                name="Account"
                component={Account}
                options={{headerShown: true}}
              />
            </>
          ) : (
            <>
              <Stack.Screen name="Welcome" component={Welcome} />
              <Stack.Screen name="Signup" component={Signup} />
              <Stack.Screen name="Login" component={Login} />
            </>
          )} */}
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Detail" component={Detail} />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{headerShown: true}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default App;
