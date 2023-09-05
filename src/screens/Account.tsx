import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import ResponsiveImage from 'react-native-responsive-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../constants/ColorConstant';
import {useNavigation} from '@react-navigation/native';
import useAuth from '../hooks/useAuth';

const Account = () => {
  const navigation = useNavigation();
  // const {logout} = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ResponsiveImage
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/547/547413.png',
          }}
          initWidth={80}
          initHeight={80}
        />
      </View>
      <View style={styles.emailContainer}>
        <Text style={styles.email}>langthao200243@gmail.com</Text>
      </View>
      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('Signup')}>
        <MaterialCommunityIcons name="account-plus" size={24} color="black" />
        <Text style={styles.optionText}>Add an account</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('Login')}>
        <MaterialCommunityIcons name="logout" size={24} color="black" />
        <Text style={styles.optionText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emailContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  email: {
    fontSize: 16,
    color: 'black',
  },
  option: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#f2f0e9',
    padding: 20,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'black',
  },
});

export default Account;
