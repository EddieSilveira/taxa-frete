import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Cabecalho = ({ titulo }) => {
  return (
    <View>
      <Text style={styles.cabecalho}>{titulo}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cabecalho: {
    fontSize: 25,
    height: 80,
    paddingTop: 30,
    backgroundColor: '#FFF',
    color: '#029AED',
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 10,
  },
});

export default Cabecalho;
