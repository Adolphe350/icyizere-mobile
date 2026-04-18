import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Screens
import HomeScreen from '../screens/HomeScreen';
import InstitutionsScreen from '../screens/InstitutionsScreen';
import InstitutionDetailScreen from '../screens/InstitutionDetailScreen';
import AddInstitutionScreen from '../screens/AddInstitutionScreen';
import RankingsScreen from '../screens/RankingsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Auth Stack (for future login/signup)
const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      {/* Auth screens will be added when API is ready */}
    </Stack.Navigator>
  );
};

// Main App Navigator
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#0F766E',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: {
          backgroundColor: '#1F2937',
          borderTopColor: '#374151',
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Institutions':
              iconName = focused ? 'list' : 'list-outline';
              break;
            case 'Add':
              iconName = focused ? 'add-circle' : 'add-circle-outline';
              break;
            case 'Rankings':
              iconName = focused ? 'bar-chart' : 'bar-chart-outline';
              break;
            case 'Settings':
              iconName = focused ? 'settings' : 'settings-outline';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabelStyle: {
          fontSize: 10,
          marginBottom: 4,
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen 
        name="Institutions" 
        component={InstitutionsScreen} 
        options={{ tabBarLabel: 'Institutions' }}
      />
      <Tab.Screen 
        name="Add" 
        component={AddInstitutionScreen} 
        options={{ tabBarLabel: 'Add' }}
      />
      <Tab.Screen 
        name="Rankings" 
        component={RankingsScreen} 
        options={{ tabBarLabel: 'Rankings' }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ tabBarLabel: 'Settings' }}
      />
    </Tab.Navigator>
  );
};

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
}
