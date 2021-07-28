import React from 'react'
import { NavigationContainer, RouteProp } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import Analysis from '../screens/analysis/index'
import Record from '../screens/record/index'
import User from '../screens/user/index'
import Icon from 'react-native-vector-icons/AntDesign'

const Tab = createBottomTabNavigator()
const RecordStack = createStackNavigator()
const AnalysisStack = createStackNavigator()
const UserStack = createStackNavigator()

const RecordStackScreen = () => (
  <RecordStack.Navigator>
    <RecordStack.Screen name="Record" component={Record}></RecordStack.Screen>
  </RecordStack.Navigator>
)

const AnalysisStackScreen = () => (
  <AnalysisStack.Navigator>
    <AnalysisStack.Screen
      name="Analysis"
      component={Analysis}
    ></AnalysisStack.Screen>
  </AnalysisStack.Navigator>
)

const UserStackScreen = () => (
  <UserStack.Navigator>
    <UserStack.Screen name="User" component={User}></UserStack.Screen>
  </UserStack.Navigator>
)

const IconToggler = (
  route: RouteProp<Record<string, object | undefined>, string>,
  focused: boolean,
  size: number,
) => {
  let iconName = ''

  switch (route.name) {
    case 'Record':
      iconName = 'book'
      break
    case 'Analysis':
      iconName = 'appstore-o'
      break
    case 'User':
      iconName = 'user'
      break
    default:
      break
  }

  return (
    <Icon name={iconName} color={focused ? '#31AAB7' : '#ACBAC3'} size={size} />
  )
}

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size }) => IconToggler(route, focused, size),
        })}
      >
        <Tab.Screen name="Record" component={RecordStackScreen} />
        <Tab.Screen name="Analysis" component={AnalysisStackScreen} />
        <Tab.Screen name="User" component={UserStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator
