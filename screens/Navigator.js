import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Sell from './Sell';
import MyAds from './MyAds';
import Account from './Account';
import Chat from './Chat';
import { Ionicons } from '@expo/vector-icons'; // Import your icon library
import { PRIMARY, SECONDARY, SUPPORTING } from '../colors';

const Tab = createBottomTabNavigator();
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const Navigator = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      // sceneContainerStyle={{marginBottom:10}}
      screenOptions={({ route }) => ({
        tabBarStyle:{height: height * 0.08, paddingVertical:5, backgroundColor:'#EFEDED' },
        headerShown: false,
        tabBarIcon: ({ focused, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            size = focused ? 35 : 22;
          } else if (route.name === 'Sell') {
            iconName = focused ? 'cart' : 'cart-outline';
            size = focused ? 35 : 22;
          } else if (route.name === 'MyAds') {
            iconName = focused ? 'list' : 'list-outline';
            size = focused ? 35 : 22;
          } else if (route.name === 'Account') {
            iconName = focused ? 'person' : 'person-outline';
            size = focused ? 35 : 22;
          } else if (route.name === 'Chat') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
            size = focused ? 35 : 22;
          }
          const elevation = focused ? 8 : 0
          const shadowStyle = focused ? { shadowColor: PRIMARY, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 4 } : {};
          // You can return any component here that you want to display as the tab icon.
          return <Ionicons name={iconName} size={size} color={PRIMARY} style={{ elevation, ...shadowStyle }} />;
        },
        tabBarLabel: ({ focused, color, fontWeight }) => {
          let label;
          if (route.name === 'Home') {
            label = 'Home';
            color = focused ? PRIMARY : 'gray'
            fontWeight = focused ? '600' : '400'
          } else if (route.name === 'Sell') {
            label = 'Sell';
            color = focused ? PRIMARY : 'gray'
            fontWeight = focused ? '600' : '400'
          } else if (route.name === 'MyAds') {
            label = 'My Ads';
            color = focused ? PRIMARY : 'gray'
            fontWeight = focused ? '600' : '400'
          } else if (route.name === 'Account') {
            label = 'Account';
            color = focused ? PRIMARY : 'gray'
            fontWeight = focused ? '600' : '400'
          } else if (route.name === 'Chat') {
            label = 'Chat';
            color = focused ? PRIMARY : 'gray'
            fontWeight = focused ? '600' : '400'
          }

          // You can return any component here that you want as the tab label.
          return <Text style={{ color, fontWeight }}>{label}</Text>;
        },
      })}
    >

      <Tab.Screen name="Sell" component={Sell} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="MyAds" component={MyAds} />
      <Tab.Screen name="Account" component={Account} />

    </Tab.Navigator>
  );
};

export default Navigator;
