import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Player from '../Screens/Player';
import ListMusic from '../Screens/ListMusic';

const Stack = createStackNavigator();

function StackNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='ListMusic'
                backBehavior='history'
            >
                <Stack.Screen name="ListMusic" component={ListMusic} 
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen name="Player" component={Player} options={{
                    headerShown: false,
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default StackNavigation;