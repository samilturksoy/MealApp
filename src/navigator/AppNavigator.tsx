import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import SearchScreen from '../screens/SearchScreen';
import LikesScreen from '../screens/LikesScreen';

    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator();
    const HomeStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="HomeMain" component={HomeScreen} options={{title:'Home'}} />
                <Stack.Screen name="Detail" component={DetailScreen} options={{title:'Meal Details'}} />
            </Stack.Navigator>
        );
    };

const AppNavigator = () => {
  return (
        <Tab.Navigator>
         <Tab.Screen name="Home" component={HomeStack} options={{headerShown:false}} />
         <Tab.Screen name="Search" component={SearchScreen} />
         <Tab.Screen name="Likes" component={LikesScreen} />
        </Tab.Navigator>
  );
};

export default AppNavigator;
