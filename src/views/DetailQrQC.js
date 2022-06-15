import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../styles/globalStyles';
import moment from 'moment';
import {ScrollView, Fab, Icon} from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import ActionComp from '../components/ActionComp';
import {useIsFocused} from '@react-navigation/native';
const DetailQrQC = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const [details, setDetails] = useState(null);
  useEffect(() => {
    console.log('Route', route.params.model);
    setDetails(route.params.model);
  }, [isFocused]);
  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={styles.headerLabel}>
          Fiche Numéro: {details && details.id_qrqc}
        </Text>
        <Text style={styles.headerLabel}> {details && details.desc_prob}</Text>
      </View>
      <View
        style={{
          width: '100%',
          justifyContent: 'space-evenly',
          flexDirection: 'row',
          marginVertical: 10,
        }}>
        <TouchableOpacity
          style={styles.styleBtn}
          onPress={() => {
            navigation.navigate('Action');
          }}>
          <Text style={styles.headerLabel}>Ajouter Action</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.styleBtn}
          onPress={() => {
            navigation.navigate('SecondReason', {prev: 'Details'});
          }}>
          <Text style={styles.headerLabel}>Ajouter Cause</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{width: '100%'}}
        contentContainerStyle={{
          justifyContent: 'flex-start',
          width: '100%',
          height: 1000,
          alignItems: 'center',
        }}>
        <View style={styles.problem}>
          <Text style={styles.labelStyle}>Problème</Text>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 5,
            }}>
            <Text style={styles.label}>
              Service: {details && details.Service}
            </Text>
            <Text style={styles.label}>
              Date:{' '}
              {details && moment(details.Date_probleme).format('DD/MM/YYYY')}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 5,
            }}>
            <Text style={styles.label}>
              Article: {details && details.NumArticle}
            </Text>
            <Text style={styles.label}>Num OF: {details && details.NumOf}</Text>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <Text style={styles.label}>
              Position: {details && details.pos_probleme}
            </Text>
            <Text style={styles.label}>
              Employée: {details && details.nom_personne}
            </Text>
          </View>
        </View>

        <View style={styles.problem}>
          <Text style={styles.labelStyle}>Détection</Text>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 5,
            }}>
            <Text style={styles.label}>
              Service: {details && details.Service}
            </Text>
            <Text style={styles.label}>
              Date:{' '}
              {details && moment(details.Date_probleme).format('DD/MM/YYYY')}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <Text style={styles.label}>
              Article: {details && details.NumArticle}
            </Text>
            <Text style={styles.label}>Num OF: {details && details.NumOf}</Text>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <Text style={styles.label}>
              Position: {details && details.pos_probleme}
            </Text>
            <Text style={styles.label}>
              Employée: {details && details.nom_personne}
            </Text>
          </View>
        </View>
        <ScrollView style={styles.problem} nestedScrollEnabled>
          <Text style={styles.labelStyle}>Cause</Text>
          {details &&
            details.cause &&
            details.cause.length != 0 &&
            details.cause.map((elm, ind) => {
              console.log('ELM', elm);
              return (
                <>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 10,
                    }}>
                    <Text style={styles.label}>
                      N°:{ind + 1}: {elm.desc_cause}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'column',
                      justifyContent: 'space-evenly',
                      marginBottom: 10,
                    }}>
                    <Text style={styles.label}>
                      - {elm && elm.rep_1 && elm.rep_1}
                    </Text>
                    <Text style={styles.label}>
                      - {elm && elm.rep_2 && elm.rep_2}
                    </Text>
                    <Text style={styles.label}>
                      - {elm && elm.rep_3 && elm.rep_3}
                    </Text>
                    <Text style={styles.label}>
                      - {elm && elm.rep_4 && elm.rep_4}
                    </Text>
                    <Text style={styles.label}>
                      - {elm && elm.rep_5 && elm.rep_5}
                    </Text>
                  </View>
                </>
              );
            })}
        </ScrollView>
        <ScrollView style={styles.actionDisplay} nestedScrollEnabled>
          <Text style={styles.labelStyle}>Action</Text>
          {details &&
            details.action.map(elm => (
              <ActionComp action={elm} key={elm.id_action.toString()} />
            ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default DetailQrQC;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FDBA74',
    width: '100%',
    height: 100,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLabel: {
    fontSize: 24,
    color: '#FFFF',
    fontWeight: 'bold',
  },
  problem: {
    width: '90%',
    height: 200,
    padding: 10,
    backgroundColor: '#FFEDD5',
    borderRadius: 20,
    marginVertical: 10,
  },
  actionDisplay: {
    width: '90%',
    height: 400,
    padding: 10,
    backgroundColor: '#FFEDD5',
    borderRadius: 20,
    marginVertical: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: '700',
  },
  labelStyle: {
    fontSize: 24,
    fontWeight: '700',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  styleBtn: {
    width: '45%',
    height: 70,
    backgroundColor: '#F97316',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
