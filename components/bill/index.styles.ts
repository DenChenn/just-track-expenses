import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#ACBAC3',
    shadowRadius: 10,
    shadowOpacity: 0.6,
    borderRadius: 15,
    height: 80,
    marginHorizontal: 20,
    marginTop: 20,
  },
  leftContainer: {
    flexDirection: 'row',
    width: '70%',
  },
  rightContainer: {
    flexDirection: 'row-reverse',
    width: '30%',
  },
  iconContainer: {
    width: '20%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    fontSize: 24,
    width: '80%',
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
