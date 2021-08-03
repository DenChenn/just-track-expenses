import React from 'react'
import { View, ScrollView } from 'react-native'
import Bill from '../../components/bill'
import { Calendar, CustomMarking } from 'react-native-calendars'
import { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import styles from './index.styles'
import AddModal from '../../components/add-modal'
import uuid from 'react-native-uuid'

const Record = () => {
  const [dateBillMap, setDateBillMap] = useState(new Map<string, BillData[]>())
  const [currentDate, setCurrentDate] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const customMarkStyles: CustomMarking = {
    customStyles: {
      container: {
        backgroundColor: '#BB86FC',
      },
      text: {
        color: '#ffffff',
        fontWeight: 'bold',
      },
    },
  }
  const [selectMarkStyle, setSelectMarkStyle] = useState({})

  useEffect(() => {
    var date = new Date().getDate()
    var month = new Date().getMonth() + 1
    var year = new Date().getFullYear()
    var dateString = ''
    if (month > 9) {
      if (date > 9) {
        dateString =
          year.toString() + '-' + month.toString() + '-' + date.toString()
      } else {
        dateString =
          year.toString() + '-' + month.toString() + '-0' + date.toString()
      }
    } else {
      if (date > 9) {
        dateString =
          year.toString() + '-0' + month.toString() + '-' + date.toString()
      } else {
        dateString =
          year.toString() + '-0' + month.toString() + '-0' + date.toString()
      }
    }
    setCurrentDate(dateString)
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
        style={{
          height: 350,
        }}
        // Specify theme properties to override specific styles for calendar parts. Default = {}
        theme={{
          calendarBackground: '#121212',
          textSectionTitleColor: '#121212',
          todayTextColor: '#BB86FC',
          dayTextColor: '#ffffff',
          textDisabledColor: '#d9e1e8',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: '#BB86FC',
          monthTextColor: '#BB86FC',
          indicatorColor: '#BB86FC',
          textDayFontWeight: '300',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
        }}
      ></Calendar>
      <ScrollView style={styles.scrollContainer}>
        {dateBillMap.get(currentDate)?.map((billDataItem) => {
          return (
            <Bill
              title={billDataItem.title ? billDataItem.title : ''}
              amount={billDataItem.amount ? billDataItem.amount : 0}
              key={uuid.v4().toString()}
            ></Bill>
          )
        })}
      </ScrollView>
      <View style={styles.iconContainer}>
        <View style={styles.iconOuter}>
          <Icon
            name="plus"
            color="#000000"
            size={24}
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
