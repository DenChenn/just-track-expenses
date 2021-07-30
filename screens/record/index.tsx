import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import Bill from '../../components/bill'
import { Calendar } from 'react-native-calendars'
import { useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import styles from './index.styles'
import AddModal from '../../components/add-modal'

const Record = () => {
  const [dateBillMap, setDateBillMap] = useState(new Map<string, BillData[]>())
  const [currentDate, setCurrentDate] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <View style={styles.recordContainer}>
      <Calendar
        onDayPress={(day) => {
          console.log('selected day', day)
          setCurrentDate(day.dateString)
        }}
        style={styles.calendarContainer}
      ></Calendar>
      <Bill title="GGGG" amount={1}></Bill>
      <ScrollView>
        {dateBillMap.get(currentDate)?.map((billDataItem) => {
          return (
            <Bill
              title={billDataItem.title ? billDataItem.title : ''}
              amount={billDataItem.amount ? billDataItem.amount : 0}
            ></Bill>
          )
        })}
      </ScrollView>
      <View style={styles.iconContainer}>
        <View style={styles.iconOuter}>
          <Icon
            name="plus"
            color="#000000"
            size={36}
            onPress={() => setModalOpen(true)}
          ></Icon>
        </View>
      </View>
      <AddModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        dateBillMap={dateBillMap}
        setDateBillMap={setDateBillMap}
        currentDate={currentDate}
      ></AddModal>
    </View>
  )
}

export default Record
