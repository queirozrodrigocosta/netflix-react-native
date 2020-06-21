import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes/routes';
import messaging from '@react-native-firebase/messaging';
import {Notifications} from 'react-native-notifications';
import {ProfileProvider} from './src/context/ProfileContext';
import AsyncStorage from '@react-native-community/async-storage';

const App = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log(remoteMessage);
      Notifications.postLocalNotification({
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification.body,
        extra: remoteMessage?.data,
      });
    });

    return unsubscribe;
  }, []);

  const save = async (newState) => {
    try {
      // const data = { ...state, ...newState };
      // console.log(data);
      const jsonValue = JSON.stringify(newState);
      await AsyncStorage.setItem('@userState', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'changePerfil':
        save(action.data);
        return {
          ...state,
          ...action.data,
        };
      default:
        return state;
    }
  };

  return (
    <ProfileProvider initialState={null} reducer={reducer}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </ProfileProvider>
  );
};

export default App;
