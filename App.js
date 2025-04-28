import React from 'react';
import { View, Image, StyleSheet } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Posts from './src/screens/Posts';
import Login from './src/screens/Login';
import Dashboard from './src/screens/Dashboard';
import  TTManuallyCompleted from './src/screens/TTManuallyCompleted';
import TTLateReporting from './src/screens/TTLateReporting'
import TankUtilization from './src/screens/TankUtilization'
import { useSelector } from 'react-redux';
import 'react-native-reanimated';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const TASAnalyticStack = createNativeStackNavigator();


const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Posts" component={Posts} />
      <Drawer.Screen name="DashBoard" component={Dashboard} />
      <Drawer.Screen name="TT Manually Completed" component={TTManuallyCompleted} />
      <Drawer.Screen name="TT Late Reporting" component={TTLateReporting} />
      <Drawer.Screen name="Tank Utilization" component={TankUtilization} />
    </Drawer.Navigator>
  );
};

const App = () => {
  const user = useSelector((state) => state.auth.user);
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Drawer" component={DrawerNavigator} />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
});

export default App;
