import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screen/Login';
import ForgotPassword from '../Screen/ForgotPassword';
import OtpVerify from '../Screen/OtpVerify';
import ResetPassword from '../Screen/ResetPassword';

const AuthStack = () => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
            <Stack.Screen name='OtpVerify' component={OtpVerify} />
            <Stack.Screen name='ResetPassword' component={ResetPassword} />
        </Stack.Navigator>
    )
}

export default AuthStack