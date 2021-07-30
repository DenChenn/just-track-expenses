import React from 'react'
import styles from './index.styles'
import {
  View,
  Modal,
  TextInput,
  Button,
  NativeSyntheticEvent,
  NativeTouchEvent,
} from 'react-native'
import { Formik } from 'formik'
import Icon from 'react-native-vector-icons/AntDesign'

const AddModal = (props: {
  modalOpen: boolean
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  dateBillMap: Map<string, BillData[]>
  setDateBillMap: React.Dispatch<React.SetStateAction<Map<string, BillData[]>>>
  currentDate: string
}) => {
  return (
    <Modal visible={props.modalOpen} animationType="slide">
      <View style={styles.addModalContainer}>
        <View style={styles.iconContainer}>
          <Icon
            name="close"
            size={24}
            color="#ffffff"
            onPress={() => props.setModalOpen(false)}
          ></Icon>
        </View>
        <Formik
          initialValues={{ title: '', billType: '', amount: '' }}
          onSubmit={(values) => {
            let newBillData: BillData = {
              title: values.title,
              amount: Number(values.amount),
              billType: values.billType,
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
                (prev) =>
                  new Map([...prev, [props.currentDate, [newBillData]]]),
              )
            }
            props.setModalOpen(false)
          }}
        >
          {(formikProps) => (
            <View>
              <TextInput
                placeholder="Enter what you spent: "
                onChangeText={formikProps.handleChange('title')}
                value={formikProps.values.title}
                style={styles.input}
                placeholderTextColor="#737373"
              />
              <TextInput
                placeholder="Enter what tpye you spent on: "
                onChangeText={formikProps.handleChange('billType')}
                value={formikProps.values.billType}
                style={styles.input}
                placeholderTextColor="#737373"
              />
              <TextInput
                placeholder="Enter how nuch you spent: "
                onChangeText={formikProps.handleChange('amount')}
                value={formikProps.values.amount}
                style={styles.input}
                placeholderTextColor="#737373"
              />
              <Button
                title="Submit"
                color="#BB86FC"
                onPress={
                  (formikProps.handleSubmit as unknown) as (
                    ev: NativeSyntheticEvent<NativeTouchEvent>,
                  ) => void
                }
              ></Button>
            </View>
          )}
        </Formik>
      </View>
    </Modal>
  )
}

export default AddModal
