import React from 'react'
import { View, Text } from 'react-native'
import styles from './index.styles'
import Icon from 'react-native-vector-icons/AntDesign'

const Bill = (props: { title: string; amount: number }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="shoppingcart" color="#ffffff" size={30}></Icon>
      </View>
      <Text style={styles.titleContainer}>{props.title}</Text>

      <Text style={styles.amountContainer}>{props.amount.toString()}</Text>
    </View>
  )
}

export default Bill
