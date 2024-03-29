import { Alert, AppState, BackHandler, Linking } from 'react-native'
import React, { useState, useCallback, useEffect, useRef } from 'react'
import AuthStack from './App/Navigation/AuthStack'
import { NavigationContainer } from '@react-navigation/native';
import AuthContext from './App/Services/Context';
import { clearUserData, getAccessToken, getUserData } from './App/Services/AsyncStorage';
import DrawerStack from './App/Navigation/DrawerStack';
import { getFcmPermission, getFcmToken } from './App/Services/DeviceToken';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
import { Notification } from './App/Services/Notification';
import { navigate, navigationRef } from './App/Services/NavigationRef';
import Apis from './App/Services/Apis';
import { KEY, SOURCE } from './App/Services/Constant';
import { ToastError, ToastMessage } from './App/Services/CommonFunction';
import SplashScreen from 'react-native-splash-screen'
import MainStack from './App/Navigation/MainStack';
import VersionCheck from 'react-native-version-check';
import { fetch as fetchPolyfill } from 'whatwg-fetch'

const App = () => {

  const [state, setState] = useState({
    loading: true,
    isLogin: false,
    userdata: null,
    accesstoken: null,
    userProfile: null,
    appVersion: '1.0'
  })
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // console.log('App has come to the foreground!');
        onAppUpdate();
      }
      appState.current = nextAppState;
    });

    return () => subscription.remove();
  }, []);

  const onAppUpdate = async () => {
    global.fetch = fetchPolyfill
    VersionCheck.needUpdate()
      .then(async res => {
        if (__DEV__) {
          console.log('UpdateChecker', JSON.stringify(res))
        }
        if (res?.currentVersion) {
          setState(prev => ({
            ...prev,
            appVersion: res?.currentVersion
          }))
        }
        if (res?.isNeeded && res?.storeUrl) {
          Alert.alert(
            'Update Available',
            'A new version of the app is available. Please update for the best experience.',
            [
              {
                text: 'Update Now',
                onPress: () => Linking.openURL(res?.storeUrl)
              }
            ],
            { cancelable: false }
          )
        } else {
          // No update is required
          if (__DEV__) {
            console.log('You are using the latest version.');
          }
        }
      })
      .catch(err => {
        if (__DEV__) {
          console.error('Error checking for updates:', err)
        }
      });
  }

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (__DEV__) {
        console.log('ForgroundMessage', JSON.stringify(remoteMessage));
      }
      let title = remoteMessage.notification.title
      let body = remoteMessage.notification.body
      let data = remoteMessage.data
      Notification(title, body, data);
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    //for Background state Notification
    const unsubscribes = messaging().onNotificationOpenedApp(remoteMessage => {
      if (__DEV__) {
        console.log('Notification caused app to open from background states:', remoteMessage);
      }
      if (remoteMessage) {
        navigate(remoteMessage.data)
      }
    });
    return unsubscribes
  }, [])

  useEffect(() => {
    //for Quit state Notification
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          if (__DEV__) {
            console.log('Notification caused app to open from quit state:', remoteMessage);
          }
          navigate(remoteMessage.data)
        }
      });
  }, []);

  useEffect(() => {
    //for Foreground State Notification
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          if (__DEV__) {
            console.log('User dismissed notification', detail.notification);
          }
          break;
        case EventType.PRESS:
          if (__DEV__) {
            console.log('User pressed notification', detail.notification);
          }
          let datas = detail.notification.data
          if (datas) {
            navigate(datas)
          }
          break;
      }
    });
  }, []);

  useEffect(() => {
    onGetData();
    onGetDeviceToken();
    onAppUpdate();
    // onGetStoreData();
  }, [])

  const onGetDeviceToken = async () => {
    let token = await getFcmToken();
    let premission = await getFcmPermission();
    if (__DEV__) {
      console.log('deviceToken', token);
      console.log('FcmPremission', premission)
    }
  }

  const onGetData = useCallback(async () => {
    try {
      setState(prevState => ({
        ...prevState,
        loading: true
      }))
      let datas = {
        key: KEY,
        source: SOURCE
      }
      const response = await Apis.app_setting(datas)
      if (__DEV__) {
        console.log('AppSettingApp.js', JSON.stringify(response))
      }
      if (response.status) {
        // await setAppData(response?.data);
        await onGetStoreData();
        setState(prevState => ({
          ...prevState,
          appData: response?.data,
          loading: false
        }))
        SplashScreen.hide();
      } else {
        ToastMessage(response?.message)
        BackHandler.exitApp();
      }
    } catch (error) {
      setState(prevState => ({
        ...prevState,
        loading: false
      }))
      if (__DEV__) {
        console.log(error)
      }
      ToastError();
      BackHandler.exitApp();
    }
  })

  const onGetStoreData = async () => {
    try {
      let userdata = await getUserData();
      let accesstoken = await getAccessToken();
      // if (__DEV__) {
      //   console.log('UserData', userdata);
      //   console.log('token', accesstoken)
      // }
      if (userdata && accesstoken) {
        setState(prevState => ({
          ...prevState,
          userdata: userdata,
          accesstoken: accesstoken,
          isLogin: true
        }))
        onGetProfileData()
      } else {
        setState(prevState => ({
          ...prevState,
          userdata: null,
          accesstoken: null,
          isLogin: false
        }))
      }
    } catch (error) {
      setState(prevState => ({
        ...prevState,
        userdata: null,
        accesstoken: null,
        isLogin: false
      }))
    }
  }

  const onClearStoreData = async () => {
    setState(prevState => ({
      ...prevState,
      isLogin: false,
      userdata: null,
      accesstoken: null,
      userProfile: null
    }))
    await clearUserData();
  }

  const onGetProfileData = useCallback(async () => {
    try {
      let datas = {
        key: KEY,
        source: SOURCE
      }
      const response = await Apis.profile_get(datas);
      if (__DEV__) {
        console.log('AppMyProfile', JSON.stringify(response))
      }
      if (response.status) {
        setState(prev => ({
          ...prev,
          userProfile: response?.data
        }))
      } else {
        ToastMessage(response?.message);
      }
    } catch (error) {
      if (__DEV__) {
        console.log(error)
      }
      ToastError();
    }
  })

  return (
    <AuthContext.Provider value={{ allData: state, onClearStoreData, onGetStoreData }}>
      <NavigationContainer ref={navigationRef}>
        {(!state.loading) && (
          <>
            {(state.isLogin) ?
              // <DrawerStack />
              <MainStack />
              :
              <AuthStack />
            }
          </>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

export default App