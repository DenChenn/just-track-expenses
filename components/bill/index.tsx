import React from 'react'
import BillLayout, { HEIGHT } from '../bill-layout'
import SVGAction from '../svg-action'
import { Dimensions, View } from 'react-native'
import {
  PanGestureHandler,
  State,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler'
import {
  snapPoint,
  timing,
  useClock,
  usePanGestureHandler,
  useValue,
  minus,
  clamp,
} from 'react-native-redash/lib/module/v1'
import Animated, {
  abs,
  add,
  call,
  clockRunning,
  cond,
  eq,
  min,
  not,
  set,
  useCode,
} from 'react-native-reanimated'
import styles from './index.styles'

const Bill = (props: {
  title: string
  amount: number
  inOrOut: string
  billType: string
  onSwipe: () => void
}) => {
  const { width } = Dimensions.get('window')
  const snapPointSet = [-width, -70, 0]

  const {
    gestureHandler,
    translation,
    velocity,
    state,
  } = usePanGestureHandler()
  const translateX = useValue(0)
  const offsetX = useValue(0)
  const height = useValue(HEIGHT + 40)
  const clock = useClock()
  const to = snapPoint(translateX, velocity.x, snapPointSet)
  const shouldRemove = useValue(0)
  useCode(
    () => [
      cond(
        eq(state, State.ACTIVE),
        set(translateX, add(offsetX, min(translation.x, 0))),
      ),
      cond(eq(state, State.END), [
        set(translateX, timing({ clock, from: translateX, to })),
        set(offsetX, translateX),
        cond(eq(to, -width), set(shouldRemove, 1)),
      ]),
      cond(shouldRemove, [
        set(height, timing({ from: HEIGHT + 20, to: 0 })),
        cond(not(clockRunning(clock)), call([], props.onSwipe)),
      ]),
    ],
    [props.onSwipe],
  )

  return (
    <Animated.View style={[{ height }, styles.billConatiner]}>
      <View style={{ height: 130, zIndex: -10 }}>
        <PanGestureHandler {...gestureHandler}>
          <Animated.View style={{ transform: [{ translateX }] }}>
            <BillLayout
              title={props.title}
              amount={props.amount}
              inOrOut={props.inOrOut}
              billType={props.billType}
            ></BillLayout>
          </Animated.View>
        </PanGestureHandler>
      </View>
      <View style={styles.background}>
        <TouchableWithoutFeedback onPress={() => shouldRemove.setValue(1)}>
          <SVGAction x={abs(translateX)}></SVGAction>
        </TouchableWithoutFeedback>
      </View>
    </Animated.View>
  )
}

export default Bill
