import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeNavigator from './HomeNavigator';
import CartNavigator from './CartNavigator';
import FavouriteNavigator from './FavouriteNavigator';
import NotificationNavigator from './NotificationNavigator';
import {colors} from '../../constants/colors';
import {Heart, Home, Notification, ShoppingCart} from 'iconsax-react-native';
import DrawerNavigator from './DrawerNavigator';

const TabsNavigator = () => {
  const Tabs = createBottomTabNavigator();
  return (
    <Tabs.Navigator
      screenOptions={({route}) => ({
        headerShown: false, // không show header
        tabBarShowLabel: false, // không show tên của bottom-tab
        tabBarIcon: ({focused, color, size}) => {
          (size = 24),
            (color = focused ? colors.primary.p500 : colors.dark.d500);
          let icon;
          switch (route.name) {
            case 'HomeTab':
              icon = <Home size={size} color={color} />;
              break;
            case 'FavouriteTab':
              icon = <Heart size={size} color={color} />;
              break;
            case 'CartTab':
              icon = <ShoppingCart size={size} color={color} />;
              break;
            case 'NotificationTab':
              icon = <Notification size={size} color={color} />;
              break;
          }
          return (
            <View style={{position: 'relative'}}>
              {focused ? (
                <View
                  style={{
                    position: 'absolute',
                    width: 22,
                    height: 2,
                    backgroundColor: color,
                    top: -15,
                  }}
                />
              ) : undefined}
              {icon}
            </View>
          );
        },
      })}>
      <Tabs.Screen name="HomeTab" component={HomeNavigator} />
      <Tabs.Screen name="FavouriteTab" component={FavouriteNavigator} />
      <Tabs.Screen name="CartTab" component={CartNavigator} />
      <Tabs.Screen name="NotificationTab" component={NotificationNavigator} />
    </Tabs.Navigator>
  );
};

export default TabsNavigator;
