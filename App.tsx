import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import RootNavigator from './tab-navigation-bar'
import styles from './App.styles'

export default function App() {
  return (
    <View style={styles.container}>
      <RootNavigator />
    </View>
  )
}
