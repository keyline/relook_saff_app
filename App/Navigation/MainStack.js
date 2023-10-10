import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashBoard from '../Screen/DashBoard';
import MyProfile from '../Screen/MyProfile';
import ChangePassword from '../Screen/ChangePassword';

const MainStack = () => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='DashBoard' component={DashBoard} />
            <Stack.Screen name='MyProfile' component={MyProfile} />
            <Stack.Screen name='ChangePassword' component={ChangePassword} />
        </Stack.Navigator>
    )
}

export default MainStack