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
  <RecordStack.Navigator
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#000000' },
    }}
  >
    <RecordStack.Screen name="Record" component={Record}></RecordStack.Screen>
  </RecordStack.Navigator>
)

const AnalysisStackScreen = () => (
  <AnalysisStack.Navigator
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#000000' },
    }}
  >
    <AnalysisStack.Screen
      name="Analysis"
      component={Analysis}
    ></AnalysisStack.Screen>
  </AnalysisStack.Navigator>
)

const UserStackScreen = () => (
  <UserStack.Navigator
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#000000' },
    }}
  >
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
    <Icon name={iconName} color={focused ? '#BB86FC' : '#ACBAC3'} size={size} />
  )
}

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size }) => IconToggler(route, focused, size),
        })}
        tabBarOptions={{
          style: {
            backgroundColor: '#000000',
          },
        }}
      >
        <Tab.Screen name="Record" component={RecordStackScreen} />
        <Tab.Screen name="Analysis" component={AnalysisStackScreen} />
        <Tab.Screen name="User" component={UserStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator
