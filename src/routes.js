import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const appStack = createStackNavigator();

import Login from './pages/Login';

export default function Routes() {
    return (
        <NavigationContainer>
            <appStack.Navigator screenOptions={{ headerShown: false }}>
                <appStack.Screen name="Login" component={Login} />
            </appStack.Navigator>
        </NavigationContainer>
    );
}