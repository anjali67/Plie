import { View, TextInput, StyleSheet, Text,TouchableOpacity } from 'react-native'
import React , {useState} from 'react'
import appColors from '../../../theme/appColors'
import appFonts from '../../../theme/appFonts'
import { fontSizes , windowHeight , windowWidth } from '../../../theme/appConstant'
import { Eye } from '../../../assets/icons/eye'
import { EyeOff } from '../../../assets/icons/eyeOff'

export default function TextInputView(props) {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <View style={[styles.inputContainer,  props.error && ({borderColor:appColors.error,borderWidth:1})]}>
        <TextInput
          style={styles.textInput}
          placeholder={props.placeholder}
          underlineColorAndroid="transparent"
          placeholderTextColor={appColors.placeholder}
          keyboardType={props.keyboardType}
          secureTextEntry={props.secureTextEntry && !showPassword} 
          onChangeText={props.onChangeText}
        />
        {props.secureTextEntry && (
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
            {showPassword  ? <Eye /> :  <EyeOff /> }
          </TouchableOpacity>
        )}
      </View>
      {props.error ? <Text style={styles.errorText}>{props.error}</Text> : null}
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      marginTop: windowHeight(20),
      marginHorizontal: windowWidth(30),
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: appColors.white,
      borderRadius: windowHeight(7),
      elevation: 5, 
      shadowColor: appColors.shadowColor, 
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      paddingVertical:windowHeight(2)
    },
    textInput: {
      flex: 1,
      fontFamily: appFonts.RobotoRegular,
      color: appColors.fontColor,
      fontSize: fontSizes.FONT16,
      paddingHorizontal: windowWidth(20),
      paddingVertical: windowHeight(12),
    },
    label: {
      color: appColors.fontColor,
      fontSize: fontSizes.FONT20,
      marginBottom: windowHeight(10),
    },
    iconContainer: {
      padding: windowWidth(10),
     right:windowHeight(6)
    },
    inputError: {
      borderColor:appColors.error , 
      borderWidth: 1,
    },
    errorText: {
      color:appColors.error, 
      fontSize: fontSizes.FONT14,
      marginTop: windowHeight(4),
    },
  });
  