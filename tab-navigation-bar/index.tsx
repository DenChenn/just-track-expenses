import React from 'react'
import { NavigationContainer, RouteProp } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import Analysis from '../screens/analysis/index'
import Record from '../screens/record/index'
import User from '../screens/user/index'
import Icon from 'react-native-vector-icons/AntDesign'
import { View, Text } from 'react-native'

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

interface TabContainerProps {
  label?: string
  focused?: boolean
}

const TabContainer: React.FunctionComponent<TabContainerProps> = ({
  children,
  label,
  focused,
}) => (
  <>
    {focused ? (
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: '#000000',
          alignItems: 'center',
          flex: 1,
          paddingTop: 7,
        }}
      >
        {children}
        <Text style={{ color: '#000000', marginTop: 6 }}>{label}</Text>
      </View>
    ) : (
      <View
        style={{ width: '100%', alignItems: 'center', flex: 1, paddingTop: 8 }}
      >
        {children}
        <Text style={{ color: '#ACBAC3', marginTop: 6 }}>{label}</Text>
      </View>
    )}
  </>
)

const IconToggler = (
  route: RouteProp<Record<string, object | undefined>, string>,
  focused: boolean,
  size: number,
) => {
  let iconName = ''
  let label = ''

  switch (route.name) {
    case 'Record':
      label = 'Record'
      iconName = 'book'
      break
    case 'Analysis':
      label = 'Analysis'
      iconName = 'appstore-o'
      break
    case 'User':
      label = 'User'
      iconName = 'user'
      break
    default:
      break
  }

  return (
    <TabContainer label={label} focused={focused}>
      <Icon
        name={iconName}
        color={focused ? '#000000' : '#ACBAC3'}
        size={size}
      />
    </TabContainer>
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
            backgroundColor: '#FFFFFF',
          },
          showLabel: false,
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
