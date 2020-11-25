/**
 * @format
 */

import { AppRegistry, I18nManager, View, Text } from 'react-native';
import * as React from 'react';
import {useEffect} from 'react';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import {
  SplashScreenName,
  HomeScreenName,
  CategoryScreenName,
  SearchResultScreenName,
  ProductDetailScreenName,
  LandingScreenName,
  PhoneVerificationScreenName,
  PhoneInputScreenName,
  PhoneRegistrationScreenName,
  SmsVerificationScreenName,
  key_current_route_name,
  isForceRTL,
  OrderSummaryScreenName,
} from './resource/BaseValue';
import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
// import SplashScreen from './screen/ScreenSpash';
import HomeScreen from './screen/ScreenHome';
import CategoryScreen from './screen/ScreenCategory';
import CustomDrawerSideMenu from './screen/DrawerSideMenu';
import SearchResultScreen from './screen/ScreenSearchResult';
import ProductDetailScreen from './screen/ScreenProductDetail';
import LandingScreen from './screen/ScreenLanding';
import PhoneInputScreen from './screen/ScreenPhoneInput';
import PhoneRegistrationScreen from './screen/ScreenPhoneRegistration';
import SmsVerificationScreen from './screen/ScreenSmsVerification';
import AsyncStorage from '@react-native-community/async-storage';
import OrderSummaryScreen from './screen/ScreenOrderSummary';
import SplashScreen from 'react-native-splash-screen';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

console.disableYellowBox = true;

function RootApp() {
  useEffect(()=>{
    SplashScreen.hide();
  },[]);
  if (isForceRTL) {
    I18nManager.forceRTL(true);
  } else {
    I18nManager.forceRTL(false);
  }
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();
  const HomeStack = createStackNavigator();
  function HomeStackScreen() {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name={HomeScreenName} component={HomeScreen}/>
      </HomeStack.Navigator>
    );
  }
  function SettingsStackScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() =>
        (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
      }
      onStateChange={() => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;
        if (previousRouteName !== currentRouteName) {
          // The line below uses the expo-firebase-analytics tracker
          // https://docs.expo.io/versions/latest/sdk/firebase-analytics/
          // Change this line to use another Mobile analytics SDK
        }
        // Save the current route name for later comparision
        routeNameRef.current = currentRouteName;
        try {
          AsyncStorage.setItem(key_current_route_name, currentRouteName);
        } catch (e) {}
      }}>
      {/* <Drawer.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={SplashScreenName}
        drawerContent={(props) => <CustomDrawerSideMenu {...props} />}>
        <Drawer.Screen name={HomeScreenName} component={HomeScreen} />
        <Drawer.Screen
          name={SplashScreenName}
          component={SplashScreen}
          // unmountOnBlur={true}
          options={{unmountOnBlur: true}}
        />
        <Drawer.Screen name={LandingScreenName} component={LandingScreen} />
        <Drawer.Screen
          name={PhoneInputScreenName}
          component={PhoneInputScreen}
        />
        <Drawer.Screen
          name={SmsVerificationScreenName}
          component={SmsVerificationScreen}
        />
        <Drawer.Screen
          name={PhoneRegistrationScreenName}
          component={PhoneRegistrationScreen}
        />
        <Drawer.Screen name={CategoryScreenName} component={CategoryScreen} />
        <Drawer.Screen
          name={SearchResultScreenName}
          component={SearchResultScreen}
        />
        <Drawer.Screen
          name={ProductDetailScreenName}
          component={ProductDetailScreen}
        />
        <Drawer.Screen
          name={OrderSummaryScreenName}
          component={OrderSummaryScreen}
        />
      </Drawer.Navigator> */}
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default RootApp;
AppRegistry.registerComponent(appName, () => RootApp);
