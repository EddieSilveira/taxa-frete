import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Cabecalho = ({ titulo }) => {
  return (
    <div>
      <View>
        <Text style={styles.cabecalho}>{titulo}</Text>
      </View>
    </div>
  );
};

const styles = StyleSheet.create({
  cabecalho: {
    fontSize: 25,
    paddingTop: 20,
    backgroundColor: '#EF9F37',
    color: '#029AED',
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 10,
  },
});

export default Cabecalho;
