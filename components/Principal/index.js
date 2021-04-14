import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';

import MapView from 'react-native-maps';
import InputEndereco from '../InputEndereco/Input';

const Principal = ({
  location,
  enderecoUsuario,
  enderecoEditado,
  setEnderecoEditado,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  Animated.timing(animatedValue, {
    toValue: 1,
    duration: 3000,
    useNativeDriver: false,
  }).start();

  if (enderecoUsuario && location) {
    // //Rua floriano peixoto, 300 - teste
    const latEstabelecimento = '-23.259510';
    const longEstabelecimento = '-47.302970';
    const [latUsuario, setLatUsuario] = useState(location.coords.latitude);
    const [longUsuario, setLongUsuario] = useState(location.coords.longitude);
    const [distancia, setDistancia] = useState(0);
    const [infoEndereco, setInfoEndereco] = useState(true);
    const [taxaInfo, setTaxaInfo] = useState(false);
    const [formEndereco, setFormEndereco] = useState(false);
    const [exibirBotoes, setExibirBotoes] = useState(true);
    const [taxa, setTaxa] = useState();

    const calcularDistancia = (
      latEstabelecimento,
      longEstabelecimento,
      latUsuario,
      longUsuario,
    ) => {
      let raio = 6371;
      let dLat = (latUsuario - latEstabelecimento) * (Math.PI / 180);
      let dLon = (longUsuario - longEstabelecimento) * (Math.PI / 180);

      let seno =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(latEstabelecimento * (Math.PI / 180)) *
          Math.cos(latUsuario * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      let angulo = 2 * Math.atan2(Math.sqrt(seno), Math.sqrt(1 - seno));
      let distancia = raio * angulo;
      setDistancia(distancia);
      return distancia;
    };

    const definirTaxa = () => {
      let taxa = 0;
      if (distancia < 3) {
        taxa = 3.99;
      } else if (distancia > 3 && distanca < 4) {
        taxa = 4.99;
      } else if (distancia > 4 && distancia < 5) {
        taxa = 5.99;
      } else {
        taxa = 7.99;
      }
      setTaxa(taxa);
      return taxa;
    };

    function calculaTaxa() {
      calcularDistancia(
        latEstabelecimento,
        longEstabelecimento,
        latUsuario,
        longUsuario,
      );
      definirTaxa();
      setTaxaInfo(true);
      setExibirBotoes(false);
    }

    function editarDados() {
      setInfoEndereco(false);
      setFormEndereco(true);
    }

    const animatedBackground = animatedValue.interpolate({
      inputRange: [0, 0.0001, 0.5, 0.5001, 1],
      outputRange: ['#F2CDAC', '#F2CDAC', '#F2CDAC', '#8C4227', '#8C4227'],
    });

    return (
      <SafeAreaView style={styles.container}>
        <MapView
          initialRegion={{
            latitude: latUsuario,
            longitude: longUsuario,
            latitudeDelta: 0.0042,
            longitudeDelta: 0.0031,
          }}
          style={styles.mapView}
        >
          <MapView.Marker
            coordinate={{
              latitude: latUsuario,
              longitude: longUsuario,
            }}
          />
        </MapView>

        {infoEndereco && enderecoUsuario && (
          <SafeAreaView style={styles.containerInfo}>
            <SafeAreaView style={styles.info}>
              <Text style={styles.titulo}>Endereço</Text>
              <Text style={styles.texto}>
                {enderecoUsuario.street}, {enderecoUsuario.name}
              </Text>
              <Text style={styles.texto}>
                {enderecoUsuario.district}&nbsp;
                {enderecoUsuario.subregion}
              </Text>
              <Text style={styles.texto}>{enderecoUsuario.region}</Text>
              <Text style={styles.textoNegrito}>O endereço está correto?</Text>
              {taxaInfo && (
                <Text style={styles.textoNegrito}>
                  Valor da Taxa: R$ {taxa}
                </Text>
              )}
              {exibirBotoes && (
                <SafeAreaView style={styles.containerButton}>
                  <Animated.View
                  // style={{ backgroundColor: animatedBackground }}
                  >
                    <TouchableOpacity
                      style={styles.botao}
                      onPress={() => calculaTaxa()}
                    >
                      <Text style={styles.textoButton}>SIM</Text>
                    </TouchableOpacity>
                  </Animated.View>
                  <TouchableOpacity
                    style={styles.botao}
                    onPress={() => editarDados()}
                  >
                    <Text style={styles.textoButton}>NÃO</Text>
                  </TouchableOpacity>
                </SafeAreaView>
              )}
            </SafeAreaView>
          </SafeAreaView>
        )}
        {formEndereco && (
          <InputEndereco
            enderecoUsuario={enderecoUsuario}
            enderecoEditado={enderecoEditado}
            infoEndereco={infoEndereco}
            setInfoEndereco={setInfoEndereco}
            formEndereco={formEndereco}
            setFormEndereco={setFormEndereco}
            enderecoEditado={enderecoEditado}
            setEnderecoEditado={setEnderecoEditado}
          />
        )}
      </SafeAreaView>
    );
  }
  return null;
};

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  animacao: {
    flex: 1,
  },
  mapView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  containerInfo: {
    width: '100%',
    maxHeight: 350,
  },
  info: {
    width: width - 40,
    maxHeight: 350,
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    alignItems: 'center',
    borderRadius: 25,
    padding: 20,
  },
  containerButton: {
    flexDirection: 'row',
  },
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#029AED',
  },
  texto: {
    fontSize: 18,
    color: '#000000',
    marginBottom: 10,
  },
  textoNegrito: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  botao: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: '#029AED',
    borderRadius: 25,
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoButton: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
export default Principal;
