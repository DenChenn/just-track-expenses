import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { View, Text } from 'react-native'
import styles from './index.styles'
import Animated, {
  divide,
  multiply,
  interpolate,
} from 'react-native-reanimated'
import { HEIGHT } from '../bill-layout'

const SVGAction = (props: { x: Animated.Node<number> }) => {
  const size = props.x
  const borderRadius = divide(size, 2)

  return (
    <Animated.View
      style={[
        styles.svgActionContainer,
        { height: size, width: size, borderRadius },
      ]}
    >
      <Icon name="trash-o" style={styles.icon} size={28}></Icon>
    </Animated.View>
  )
}

export default SVGAction
