import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  recordContainer: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#ffffff',
  },
  calendarContainer: {},
  iconContainer: {
    position: 'absolute',
    height: '10%',
    width: '100%',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 10,
    top: '90%',
  },
  iconOuter: {
    backgroundColor: '#ffffff',
    shadowColor: '#ACBAC3',
    shadowRadius: 8,
    shadowOpacity: 0.6,
    borderRadius: 30,
    width: 60,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  scrollContainer: {
    backgroundColor: '#ffffff',
    zIndex: 0,
  },
})
