import React, { useState } from 'react';
import {
  SafeAreaView,
  TextInput,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';

const Input = ({
  enderecoUsuario,
  infoEndereco,
  formEndereco,
  setInfoEndereco,
  setFormEndereco,
  enderedoEditado,
  setEnderecoEditado,
}) => {
  const [textRua, setTextRua] = useState(enderecoUsuario.street);
  const [textNumero, setTextNumero] = useState(enderecoUsuario.name);
  const [textBairro, setTextBairro] = useState(enderecoUsuario.district);
  const [textCidade, setTextCidade] = useState(enderecoUsuario.subregion);
  const [textEstado, setTextEstado] = useState(enderecoUsuario.region);

  function salvaAlteracoes() {
    if (!textRua && !textNumero && !textBairro && !textCidade && !textEstado) {
      alert('É necessário preencher todos os campos');
    }
    if (typeof textNumero === String) {
      alert('Digite um número!');
    }
    if (textRua && textNumero && textBairro && textCidade && textEstado) {
      enderecoUsuario.street = textRua;
      enderecoUsuario.name = textNumero;
      enderecoUsuario.district = textBairro;
      enderecoUsuario.subregion = textCidade;
      enderecoUsuario.region = textEstado;
      setFormEndereco(false);
      setInfoEndereco(true);
      setEnderecoEditado(true);
    }

    console.log(textRua, textNumero, textBairro, textCidade, textEstado);
  }
  return (
    <SafeAreaView style={styles.containerInfo}>
      <SafeAreaView style={styles.info}>
        <Text style={styles.titulo}>Editar Endereço</Text>
        <SafeAreaView style={styles.textoInline}>
          <Text style={styles.textoFixo}>Rua:</Text>
          <TextInput
            style={styles.texto}
            editable
            onChangeText={(text) => setTextRua(text)}
            value={textRua}
          ></TextInput>
          <Text style={styles.textoFixo}>Número:</Text>
          <TextInput
            style={styles.texto}
            editable
            onChangeText={(text) => setTextNumero(text)}
            value={textNumero}
            keyboardType="numeric"
          ></TextInput>
        </SafeAreaView>

        <SafeAreaView style={styles.textoInline}>
          <Text style={styles.textoFixo}>Bairro:</Text>
          <TextInput
            style={styles.texto}
            editable
            onChangeText={(text) => setTextBairro(text)}
            value={textBairro}
          ></TextInput>
          <Text style={styles.textoFixo}>Cidade:</Text>
          <TextInput
            style={styles.texto}
            editable
            onChangeText={(text) => setTextCidade(text)}
            value={textCidade}
          ></TextInput>
        </SafeAreaView>

        <SafeAreaView style={styles.buttonInline}>
          <Text style={styles.textoFixo}>Estado:</Text>
          <TextInput
            style={styles.texto}
            editable
            onChangeText={(text) => setTextEstado(text)}
            value={textEstado}
          ></TextInput>
          <TouchableOpacity style={styles.buttonAtualizar}>
            <Text style={styles.textoButton} onPress={() => salvaAlteracoes()}>
              Salvar
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  containerInfo: {
    width: '100%',
    maxHeight: 350,
  },
  info: {
    width: width - 40,
    maxHeight: 350,
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    alignItems: 'flex-start',
    borderRadius: 25,
    padding: 20,
    flexDirection: 'column',
  },
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#029AED',
  },
  texto: {
    fontSize: 18,
    marginLeft: 5,
  },
  textoFixo: {
    fontSize: 18,
    margin: 5,
    fontWeight: 'bold',
  },
  textoInline: {
    flexDirection: 'row',
  },
  buttonInline: {
    flexDirection: 'row',
  },
  buttonAtualizar: {
    marginLeft: 70,
    padding: 5,
    backgroundColor: '#029AED',
    borderRadius: 25,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoButton: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default Input;
