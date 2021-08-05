import React from 'react'
import { View, Text } from 'react-native'
import styles from './index.styles'
import Icon from 'react-native-vector-icons/FontAwesome'

export const HEIGHT = 80

const BillLayout = (props: {
  title: string
  amount: number
  inOrOut: string
  billType: string
}) => {
  return (
    <View style={[styles.container, { height: HEIGHT }]}>
      <View style={styles.leftContainer}>
        <View style={styles.iconContainer}>
          <Icon name={props.billType} color="#000000" size={24}></Icon>
        </View>

        <Text style={styles.titleContainer}>{props.title}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text
          style={[
            styles.amountContainer,
            {
              color: props.inOrOut === 'income' ? 'green' : 'red',
            },
          ]}
        >
          {props.amount.toString()}
        </Text>
      </View>
    </View>
  )
}

export default BillLayout
