import React from 'react'
import styles from './index.styles'
import {
  View,
  Modal,
  TextInput,
  Button,
  NativeSyntheticEvent,
  NativeTouchEvent,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native'
import { Formik } from 'formik'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'
import { useEffect } from 'react'

interface SubmitObject {
  title: string
  amount: string
}

interface ChosenType {
  label: string
  value: string
}

const IncomeChosenList: ChosenType[] = [
  { label: 'Salary', value: 'money' },
  { label: 'Investment', value: 'bitcoin' },
  { label: 'Rent', value: 'building' },
  { label: 'Tutor', value: 'graduation-cap' },
  { label: 'Projects', value: 'task' },
]

const ExpensesChosenList: ChosenType[] = [
  { label: 'Food', value: 'cutlery' },
  { label: 'Shopping', value: 'shopping-cart' },
  { label: 'Living', value: 'home' },
  { label: 'Transportation', value: 'taxi' },
  { label: 'Entertainment', value: 'gamepad' },
]

function FindIndex(chosenTypeList: ChosenType[], target: string) {
  for (var i = 0; i < chosenTypeList.length; i++) {
    if (chosenTypeList[i].value === target) {
      return i
    }
  }
  return 0
}

const AddModal = (props: {
  modalOpen: boolean
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  dateBillMap: Map<string, BillData[]>
  setDateBillMap: React.Dispatch<React.SetStateAction<Map<string, BillData[]>>>
  currentDate: string
}) => {
  const handleSubmit = (values: SubmitObject) => {
    let newBillData: BillData = {
      title: values.title,
      amount: Number(values.amount),
      billType: selectedType,
      inOrOut: selectedInOrOut,
    }

    if (props.dateBillMap.has(props.currentDate)) {
      let prevBillData = props.dateBillMap.get(props.currentDate)
      prevBillData?.push(newBillData)
      props.setDateBillMap((prev) =>
        prevBillData
          ? new Map([...prev, [props.currentDate, prevBillData]])
          : prev,
      )
    } else {
      props.setDateBillMap(
        (prev) => new Map([...prev, [props.currentDate, [newBillData]]]),
      )
    }
    props.setModalOpen(false)
  }
  const [selectedType, setSelectedType] = useState('money')
  const [selectedInOrOut, setSelectedInOrOut] = useState('income')
  const [typeOption, setTypeOption] = useState<ChosenType[]>([
    { label: 'Food', value: 'cutlery' },
    { label: 'Shopping', value: 'shopping-cart' },
    { label: 'Living', value: 'home' },
    { label: 'Transportation', value: 'taxi' },
    { label: 'Entertainment', value: 'gamepad' },
  ])

  useEffect(() => {
    if (selectedInOrOut === 'income') {
      setTypeOption(IncomeChosenList)
      setSelectedType(
        IncomeChosenList[FindIndex(IncomeChosenList, selectedType)].value,
      )
    } else {
      setTypeOption(ExpensesChosenList)
      setSelectedType(
        ExpensesChosenList[FindIndex(ExpensesChosenList, selectedType)].value,
      )
    }
  }, [selectedInOrOut])

  return (
    <Modal
      visible={props.modalOpen}
      animationType="slide"
      style={styles.addModalContainer}
    >
      <View style={styles.iconContainer}>
        <Icon
          name="close"
          size={30}
          color="#000000"
          onPress={() => props.setModalOpen(false)}
        ></Icon>
      </View>
      <Formik initialValues={{ title: '', amount: '' }} onSubmit={handleSubmit}>
        {(formikProps) => (
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Topic: "
                onChangeText={formikProps.handleChange('title')}
                value={formikProps.values.title}
                style={styles.input}
                placeholderTextColor="#ACBAC4"
              />
              <TextInput
                placeholder="Amount: "
                onChangeText={formikProps.handleChange('amount')}
                value={formikProps.values.amount}
                style={styles.input}
                keyboardType="numeric"
                placeholderTextColor="#ACBAC4"
              />
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Choose Spending Type</Text>
              </View>
              <View style={styles.inOutPickerContainer}>
                <Picker
                  selectedValue={selectedInOrOut}
                  style={{
                    position: 'relative',
                    height: '100%',
                    width: '100%',
                  }}
                  onValueChange={(itemValue) => setSelectedInOrOut(itemValue)}
                >
                  <Picker.Item label="Income" value="income" />
                  <Picker.Item label="Expenses" value="expenses" />
                </Picker>
              </View>
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Choose Spending Type</Text>
              </View>
              <View style={styles.typePickerContainer}>
                <Picker
                  selectedValue={selectedType}
                  style={{
                    position: 'relative',
                    height: '100%',
                    width: '100%',
                  }}
                  onValueChange={(itemValue) => setSelectedType(itemValue)}
                >
                  <Picker.Item
                    label={typeOption[0].label}
                    value={typeOption[0].value}
                  />
                  <Picker.Item
                    label={typeOption[1].label}
                    value={typeOption[1].value}
                  />
                  <Picker.Item
                    label={typeOption[2].label}
                    value={typeOption[2].value}
                  />
                  <Picker.Item
                    label={typeOption[3].label}
                    value={typeOption[3].value}
                  />
                  <Picker.Item
                    label={typeOption[4].label}
                    value={typeOption[4].value}
                  />
                </Picker>
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  title="Finish"
                  color="#000000"
                  onPress={
                    (formikProps.handleSubmit as unknown) as (
                      ev: NativeSyntheticEvent<NativeTouchEvent>,
                    ) => void
                  }
                ></Button>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      </Formik>
    </Modal>
  )
}

export default AddModal
