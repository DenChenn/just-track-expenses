import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#ACBAC3',
    shadowRadius: 10,
    shadowOpacity: 1,
    borderRadius: 15,
    height: 80,
    marginHorizontal: 20,
    marginTop: 20,
  },
  leftContainer: {
    flexDirection: 'row',
  },
  rightContainer: {
    flexDirection: 'row',
  },
  iconContainer: {
    paddingLeft: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    fontSize: 24,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  amountContainer: {
    padding: 10,
    fontSize: 20,
    color: '#000000',
  },
})
