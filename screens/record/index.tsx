import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import Bill from '../../components/bill'
import { Calendar, CustomMarking } from 'react-native-calendars'
import { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import styles from './index.styles'
import AddModal from '../../components/add-modal'

const Record = () => {
  const [dateBillMap, setDateBillMap] = useState(new Map<string, BillData[]>())
  const [currentDate, setCurrentDate] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const customMarkStyles: CustomMarking = {
    customStyles: {
      container: {
        backgroundColor: 'green',
      },
      text: {
        color: 'black',
        fontWeight: 'bold',
      },
    },
  }
  const [selectMarkStyle, setSelectMarkStyle] = useState({})

  useEffect(() => {
    var date = new Date().getDate()
    var month = new Date().getMonth() + 1
    var year = new Date().getFullYear()
    if (month > 9) {
      setCurrentDate(year + '-' + month + '-' + date)
    } else {
      setCurrentDate(year + '-0' + month + '-' + date)
    }
  }, [])

  useEffect(() => {
    setSelectMarkStyle({
      [currentDate]: customMarkStyles,
    })
  }, [currentDate])

  return (
    <View style={styles.recordContainer}>
      <Calendar
        onDayPress={(day) => {
          setCurrentDate(day.dateString)
        }}
        markingType={'custom'}
        markedDates={selectMarkStyle}
      ></Calendar>
      <Bill title="GGGG" amount={1}></Bill>
      <ScrollView>
        {dateBillMap.get(currentDate)?.map((billDataItem) => {
          return (
            <Bill
              title={billDataItem.title ? billDataItem.title : ''}
              amount={billDataItem.amount ? billDataItem.amount : 0}
              key={new Date().getTime().toString()}
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
