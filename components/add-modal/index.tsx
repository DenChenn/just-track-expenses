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
} from 'react-native'
import { Formik } from 'formik'
import Icon from 'react-native-vector-icons/AntDesign'
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'

interface SubmitObject {
  title: string
  amount: string
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
  const [selectedType, setSelectedType] = useState('Food')
  const [selectedInOrOut, setSelectedInOrOut] = useState('Income')

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
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter what you spent: "
              onChangeText={formikProps.handleChange('title')}
              value={formikProps.values.title}
              style={styles.input}
              placeholderTextColor="#ACBAC4"
            />
            <TextInput
              placeholder="Enter how nuch you spent: "
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
                <Picker.Item label="Food" value="cake" />
                <Picker.Item label="Shopping" value="shopping-cart" />
                <Picker.Item label="House" value="home" />
                <Picker.Item label="Transportation" value="gauge" />
                <Picker.Item label="Entertainment" value="game-controller" />
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
        )}
      </Formik>
    </Modal>
  )
}

export default AddModal
