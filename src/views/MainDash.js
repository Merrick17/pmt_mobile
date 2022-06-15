import {StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native';
import React, {useEffect} from 'react';
import {globalStyles} from '../styles/globalStyles';
import MainComp from '../components/MainComp';
import {useSelector} from 'react-redux';
import {Fab, Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import messaging from '@react-native-firebase/messaging';
import {ALERT_TYPE, Dialog, Root, Toast} from 'react-native-alert-notification';
const MainDash = ({navigation}) => {
  const {userInfo} = useSelector(state => state.auth);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: remoteMessage.notification.title,
        textBody: remoteMessage.notification.body,
        button: 'Fermer',
      });
    });

    return unsubscribe;
  }, []);
  return (
    <View style={globalStyles.container}>
      <Text>MainDash</Text>
      <ScrollView
        style={{width: '100%'}}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <MainComp
          image={require('../assets/prod_img.png')}
          label="Production"
          action={() => {
            navigation.navigate('Prod');
          }}
        />
        <MainComp
          image={require('../assets/ressource.png')}
          label="Ressource Humaine"
          action={() => {
            navigation.navigate('RH');
          }}
        />
        {userInfo &&
          (userInfo.SERVICE == 'QUALITE' ||
            userInfo.SERVICE == 'DIRECTION') && (
            <MainComp
              image={require('../assets/security.png')}
              label="Gestion QRQC"
              action={() => {
                navigation.navigate('QRQC');
              }}
            />
          )}

        {userInfo &&
          (userInfo.SERVICE == 'QUALITE' ||
            userInfo.SERVICE == 'DIRECTION') && (
            <MainComp
              image={require('../assets/audit_2.png')}
              label="Gestion Audit"
              action={() => {
                navigation.navigate('Audit');
              }}
            />
          )}
        <MainComp
          image={require('../assets/profile.png')}
          label="Gestion Alerts"
          action={() => {
            navigation.navigate('Profile');
          }}
        />
        {userInfo && userInfo.SERVICE == 'DIRECTION' && (
          <MainComp
            image={require('../assets/settings.png')}
            label="Paramètre"
            action={() => {
              navigation.navigate('Settings');
            }}
          />
        )}
      </ScrollView>
      <Fab
        onPress={() => {
          navigation.replace('Login');
        }}
        backgroundColor="#F97316"
        renderInPortal={true}
        shadow={2}
        bottom={50}
        placement="bottom-left"
        size="sm"
        icon={<Icon color="white" as={AntDesign} name="logout" size="8" />}
      />
    </View>
  );
};

export default MainDash;

const styles = StyleSheet.create({});
