import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const appStack = createStackNavigator();

import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import CreateTask from './pages/Task/Create/CreateTask';

export default function Routes() {
    return (
        <NavigationContainer>
            <appStack.Navigator screenOptions={{ headerShown: false }}>
                <appStack.Screen name="Login" component={Login} />
                <appStack.Screen name="Profile" component={Profile} />
                <appStack.Screen name="Register" component={Register} />
                <appStack.Screen name="CreateTask" component={CreateTask} />
            </appStack.Navigator>
        </NavigationContainer>
    );
}