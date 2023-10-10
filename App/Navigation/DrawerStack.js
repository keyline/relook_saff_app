import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import MainStack from './MainStack';

const DrawerStack = () => {

    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false
            }}
        // drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name='MainStack' component={MainStack} />
            
        </Drawer.Navigator>
    )
}

export default DrawerStack