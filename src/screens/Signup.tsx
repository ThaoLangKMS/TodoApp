import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AuthForm from '../component/AuthForm';
import {COLORS} from '../constants/ColorConstant';

const Signup: React.FC = () => {
  const navigation = useNavigation();
  const api = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 5000,
  });

  const handleSignUp = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/register', {
        email,
        password,
      });

      console.log('Registered successfully', response.data);
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Todo</Text>
      <Text style={styles.appSubtitle}>Your Tasks, Organized.</Text>
      <AuthForm onSubmit={handleSignUp} buttonText="SIGN UP" />
      <TouchableOpacity style={styles.transparentButton} onPress={goToLogin}>
        <Text style={styles.buttonText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: hp('6%'),
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  appSubtitle: {
    fontSize: hp('2%'),
    marginBottom: wp('4%'),
  },
  transparentButton: {
    width: wp('76%'),
    height: hp('6%'),
    backgroundColor: COLORS.transparent,
    justifyContent: 'center',
    borderRadius: hp('3%'),
    alignItems: 'center',
    marginTop: wp('2%'),
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
  },
});
export default Signup;
