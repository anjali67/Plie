import { View, Text  , Image, ScrollView,TouchableOpacity, ActivityIndicator, Alert} from 'react-native'
import React , {useState} from 'react'
import styles from './styles';
import SocialLogin from './socialLogin';
import TextInputView from './socialLogin/textInput'
import { ValidateEmail , ValidPassword } from '../utills/Validation';
import { useSelector,useDispatch } from 'react-redux';
import { loginUser } from '../redux/authSlice';
export default function LoginScreen({navigation}) {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [emailError,setEmailerror] = useState("")
    const [passwordError,setPasswordError] = useState("")
    const {loading} = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const handleLogin =  async() => {
      try {
        const emailValidationError =  ValidateEmail(email)
        const passwordValidationError = ValidPassword(password)
        // if(emailValidationError || passwordValidationError) {
        //        setEmailerror(emailValidationError)
        //        setPasswordError(passwordValidationError)
        //        return
        // }
        const response = await dispatch(loginUser({ email, password })).unwrap(); // Unwrap the promise
        // Handle success
        if (response.success === true) {
          Alert.alert('Success', response.message || 'Login successful!');
          navigation.navigate('EventsScreen')
          // Navigate to another screen or perform other actions
        } else {
          Alert.alert('Error', response.message || 'Login failed');
        }
      } catch (error) {
        console.log("Login Error ===============>", error);
    
        // Handle failure
        Alert.alert('Error', error.message || 'Something went wrong');
    
      }
         
        
        
          //  navigation.navigate('EventsScreen')).catch((error) => Alert.alert(error)
      
      
    }
  return (
   <View style={styles.container}>
         <View style={styles.innerView}>
           <Text style={styles.title}>Plie</Text>
           <View style={styles.blankView} />
           <View style={styles.imageView}>
             <Image />
           </View>
         </View>
         <ScrollView contentContainerStyle={{paddingBottom:40}} style={styles.bottomView}>
            <TextInputView label={'Email'} placeholder={'Enter email'} onChangeText={(text) => {
               setEmail(text)
              //  setEmailerror(ValidateEmail(text))
            }}
            error={emailError}
            />
            <TextInputView label={'Password'} placeholder={'Enter Password'}  secureTextEntry onChangeText={(text) => {
                setPassword(text)
                // setPasswordError(ValidPassword(text))
            }}
            error = {passwordError}
            />
           <View style={styles.forgotView}>
             <View>
               <Text style={styles.forgotText}>Forgot Password?</Text>
               <TouchableOpacity style={styles.buttonView} onPress={() => handleLogin()}>
                {
                  loading ? <ActivityIndicator color={'white'}/> : <Text style={styles.button}>Sign In</Text>   
                }
            
               </TouchableOpacity>
             </View>
           </View>
           <View style={styles.signUp}>
             <Text>
               Not a member?{' '}
               <TouchableOpacity>
                 <Text style={styles.signUpText}>Sign Up Here</Text>
               </TouchableOpacity>
             </Text>
           </View>
           <SocialLogin />
         </ScrollView>
       </View>
  )
}