import { View, Text, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import { Image } from '../../assets/icons/image';
import TextInputView from './textInput';
import SocialLogin from './socialLogin';
import { useSelector,useDispatch } from 'react-redux';
import { loginUser } from '../../redux/authSlice';

export default function Login({navigation}) {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [emailError, setEmailError] = useState(''); 
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const validateEmail = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!text) {
      return 'Email is required';
    }
    if (!emailRegex.test(text)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validatePassword = (text) => {
    if (!text) {
      return 'Password is required';
    }
    if (text.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    return '';
  };

  const handleSignIn = () => {
    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);
    setEmailError(emailValidationError); 
    setPasswordError(passwordValidationError); 
    if (!emailValidationError && !passwordValidationError) {
      dispatch(loginUser({ email, password }))
      .then(() => {
        console.log('Success', 'Login successful!');
        navigation.navigate('EventsScreen')
      })
      .catch((err) => {
       console.log('Error', err.message || 'Something went wrong');
      });
    }
  };

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
        <TextInputView
          label={'Email'}
          placeholder={'email@gmail.com'}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError(validateEmail(text)); 
          }}
          error={emailError} 
        />
        <TextInputView
          label={'Password'}
          placeholder={'*******'}
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setPasswordError(validatePassword(text)); 
          }}
          error={passwordError} 
        />
        <View style={styles.forgotView}>
          <View>
            <Text style={styles.forgotText}>Forgot Password?</Text>
            <TouchableOpacity style={styles.buttonView} onPress={handleSignIn}>
             {loading ? <ActivityIndicator color={'white'}/> : <Text style={styles.button}>Sign In</Text>  } 
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
  );
}