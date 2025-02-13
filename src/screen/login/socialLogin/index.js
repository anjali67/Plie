import { View, Text,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import { Google } from '../../../assets/icons/google'
import { Facebook } from '../../../assets/icons/facebook'
import { Apple } from '../../../assets/icons/apple'

export default function SocialLogin() {
  return (
    <View>
       <View style={styles.signInView}>
        <Image
          source={require('../../../assets/images/divider.png')}
          style={styles.img}
        />
        <Text
          style={
            styles.orText}>
          or SignIn with:
        </Text>
      </View>
      <View style={styles.mainView}>
      <TouchableOpacity  activeOpacity={0.7} style={styles.container}>
            <Google/>
         </TouchableOpacity>
         <TouchableOpacity activeOpacity={0.7} style={styles.container}>
            <Apple/>
         </TouchableOpacity>
         <TouchableOpacity activeOpacity={0.7} style={styles.container}>
            <Facebook/>
         </TouchableOpacity>
      </View>
   
    </View>
  )
}