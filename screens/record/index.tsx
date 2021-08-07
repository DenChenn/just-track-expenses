import React, { createRef } from 'react'
import { View } from 'react-native'
import Bill from '../../components/bill'
import { Calendar, CustomMarking } from 'react-native-calendars'
import { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import styles from './index.styles'
import AddModal from '../../components/add-modal'
import uuid from 'react-native-uuid'
import { BillData } from '../../models'
import { ScrollView } from 'react-native-gesture-handler'

const Record = () => {
  const [dateBillMap, setDateBillMap] = useState(new Map<string, BillData[]>())
  const [currentDate, setCurrentDate] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const customMarkStyles: CustomMarking = {
    customStyles: {
      container: {
        backgroundColor: '#000000',
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

  const scrollRef = createRef<ScrollView>()

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
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#ffffff',
          todayTextColor: '#31AAB7',
          dayTextColor: '#000000',
          textDisabledColor: '#d9e1e8',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: '#000000',
          monthTextColor: '#000000',
          indicatorColor: '#BB86FC',
          textDayFontWeight: '300',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 20,
          textDayHeaderFontSize: 16,
        }}
      ></Calendar>
      <ScrollView ref={scrollRef}>
        {dateBillMap.get(currentDate)?.map((item) => {
          return (
            <Bill
              title={item.title ? item.title : ''}
              amount={item.amount ? item.amount : 0}
              inOrOut={item.inOrOut ? item.inOrOut : ''}
              billType={item.billType ? item.billType : ''}
              scrollRef={scrollRef}
              key={item.id}
              onSwipe={() => {
                const newDateBillMap = new Map<string, BillData[]>(dateBillMap)
                const currentDateArray = newDateBillMap.get(currentDate)
                for (var i = 0; i < currentDateArray.length; i++) {
                  if (currentDateArray[i].id === item.id) {
                    currentDateArray.splice(i, 1)
                    newDateBillMap.delete(currentDate)
                    newDateBillMap.set(currentDate, currentDateArray)
                    setDateBillMap(newDateBillMap)
                    break
                  }
                }
              }}
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
