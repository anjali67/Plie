import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { increment , decrement , incrementByAmount } from '../redux/counterSlice'

export default function CounterScreen() {
  const dispatch = useDispatch()
  const counter = useSelector((state) => state.counter.value);
 
  return (
    <View style={{marginHorizontal:20}}>
      <Text>{counter}</Text>
        <TouchableOpacity onPress={() => dispatch(increment())}>
          <Text>Increment</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(decrement())}>
          <Text>Decrement</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(incrementByAmount(5))}>
            <Text>Increment By Amount</Text>
        </TouchableOpacity>
    </View>
  )
}