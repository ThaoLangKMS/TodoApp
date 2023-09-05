import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AuthForm from '../component/AuthForm';
import {COLORS} from '../constants/ColorConstant';
import {saveTokenToMMKV} from '../utils/storage';
import useAuth from '../hooks/useAuth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

const Login: React.FC = () => {
  const navigation = useNavigation();
  const api = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 5000,
  });

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      //this.setState({ userInfo });
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  //const {user, tokens, login, logout, refreshAccessToken} = useAuth();
  async function signInWithGoogle() {
    // try {
    //   await GoogleSignin.hasPlayServices();
    //   const userInfo = await GoogleSignin.signIn();
    //   // Gửi thông tin userInfo đến backend để xác thực và tạo session
    // } catch (error: any) {
    //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //     console.log('Đăng nhập đã bị hủy');
    //   } else if (error.code === statusCodes.IN_PROGRESS) {
    //     console.log('Quá trình đăng nhập đang trong tiến trình');
    //   } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //     console.log('Dịch vụ Google Play không khả dụng hoặc đã lỗi thời');
    //   } else {
    //     console.log('Lỗi xảy ra khi đăng nhập', error);
    //   }
    // }
  }

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      console.log('Logged in successfully', response.data);

      saveTokenToMMKV('access_token', response.data.access_token);
      saveTokenToMMKV('refresh_token', response.data.refresh_token);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Login failed', error);
    }
    //Login(email, password);
  };

  // useEffect(() => {
  //   if (tokens && tokens.accessToken) {
  //     const expiresIn = 50 * 60 * 1000;
  //     const refreshTimer = setTimeout(refreshAccessToken, expiresIn);
  //     return () => clearTimeout(refreshTimer);
  //   }
  // }, [tokens]);

  const goToSignup = () => {
    navigation.navigate('Signup');
  };

  const handleGoogleLogin = () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Todo</Text>
      <Text style={styles.appSubtitle}>Your Tasks, Organized.</Text>
      <AuthForm onSubmit={handleLogin} buttonText="SIGN IN" />
      <TouchableOpacity style={styles.transparentButton} onPress={goToSignup}>
        <Text style={styles.buttonText}>Don't have an account? Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.transparentButton} onPress={signIn}>
        <Text style={styles.buttonText}>Login with Google</Text>
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

export default Login;
