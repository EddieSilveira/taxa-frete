import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Permissions from 'expo-permissions';

import Cabecalho from './components/Cabecalho';
import Principal from './components/Principal';

export default function App() {
  const [temPermissao, setTemPermissao] = useState(null);

  useEffect(() => {
    async () => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      setTemPermissao(status === 'granted');
    };
  }, []);

  // if (!temPermissao) {
  //   return <Text>Acesso negado a localização do seu equipamento.</Text>;
  // }

  return (
    <View style={styles.container}>
      <Cabecalho titulo={'Calcula Delivery'} />
      <Principal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FED9B0',
  },
});
