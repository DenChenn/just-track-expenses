import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  addModalContainer: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    flex: 1,
    alignItems: 'center',
  },
  iconContainer: {
    position: 'relative',
    flexDirection: 'row',
    marginTop: 50,
    paddingLeft: 30,
    flex: 1,
  },
  inputContainer: {
    position: 'relative',
    flex: 12,
    alignItems: 'center',
  },
  inOutPickerContainer: {
    flex: 0.5,

    width: '80%',
    marginBottom: 120,
  },
  typePickerContainer: {
    flex: 1.5,

    width: '80%',
    marginBottom: 180,
  },
  input: {
    position: 'relative',
    width: 300,
    height: 60,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ACBAC4',
    color: '#000000',
    fontSize: 24,
    marginTop: 20,
    marginHorizontal: 20,
    paddingLeft: 10,
    backgroundColor: '#ffffff',
    flex: 1.4,
  },
  buttonContainer: { position: 'relative', flex: 2 },
  titleContainer: {
    flex: 1,
    marginTop: 40,
    height: 50,
    width: '100%',
    fontSize: 24,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
  },
  titleText: {
    width: '100%',
    height: '100%',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 24,
  },
})
