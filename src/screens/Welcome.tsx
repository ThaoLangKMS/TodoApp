import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import ResponsiveImage from 'react-native-responsive-image';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../constants/ColorConstant';

const Welcome = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.appText}>Todo</Text>
      <Text style={styles.appSubtitle}>Your Tasks, Organized.</Text>
      <View style={styles.image}>
        <ResponsiveImage
          source={{
            uri: 'https://img.icons8.com/?size=512&id=114426&format=png',
          }}
          initWidth={375}
          initHeight={375}
        />
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.introText}>Let's Begin</Text>
        <MaterialIcons name="arrow-forward-ios" size={hp('3%')} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  introText: {
    color: 'white',
    fontSize: hp('2.5%'),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonContainer: {
    backgroundColor: COLORS.primary,
    padding: hp('2.5%'),
    width: '90%',
    borderRadius: hp('1.5%'),
    marginBottom: hp('15%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  appText: {
    fontWeight: 'bold',
    fontSize: wp('10%'),
    marginTop: wp('20%'),
    color: COLORS.black,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appSubtitle: {
    fontSize: hp('2%'),
    marginBottom: wp('4%'),
  },
});

export default Welcome;
