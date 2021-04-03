import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';

const Principal = () => {
  const [texto, setTexto] = React.useState('');

  const validaCEP = () => {
    {
      console.log(texto);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.texto}>CEP do Destino:</Text>
      <TextInput
        style={styles.input}
        value={texto}
        onChangeText={setTexto}
      ></TextInput>
      <TouchableOpacity style={styles.botao} OnClick={validaCEP(texto)}>
        <Text style={styles.botao}>Buscar CEP</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    fontSize: 20,
    color: '#029AED',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
    borderColor: '#029AED',
  },
  botao: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#EF9F37',
    color: '#029AED',
    padding: 5,
  },
});
export default Principal;
