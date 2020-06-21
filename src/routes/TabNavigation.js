import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screen/Home';
import More from '../screen/More';
import {translate} from '../locale';
import Icon from 'react-native-vector-icons/dist/AntDesign';
Icon.loadFont();

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        inactiveTintColor: 'gray',
        activeTintColor: 'white',
        showIcon: true,
        style: {
          backgroundColor: '#1a1718',
          borderTopColor: 'transparente',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: translate('home'),
          tabBarIcon: ({color}) => {
            return <Icon name="home" size={24} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Buscar"
        component={Home}
        options={{
          tabBarLabel: translate('buscar'),
          tabBarIcon: ({color}) => {
            return <Icon name="search1" size={24} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Embreve"
        component={Home}
        options={{
          tabBarLabel: translate('emBreve'),
          tabBarIcon: ({color}) => {
            return <Icon name="calendar" size={24} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Downloads"
        component={Home}
        options={{
          tabBarLabel: translate('baixar'),
          tabBarIcon: ({color}) => {
            return <Icon name="download" size={24} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Mais"
        component={More}
        options={{
          tabBarLabel: translate('mais'),
          tabBarIcon: ({color}) => {
            return <Icon name="appstore-o" size={24} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
