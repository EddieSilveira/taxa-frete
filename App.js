import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';

import Cabecalho from './components/Cabecalho';
import Principal from './components/Principal';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [enderecoUsuario, setEnderecoUsuario] = useState({});
  const [enderecoEditado, setEnderecoEditado] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar a localização foi negada!');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (location.coords !== null) {
          let endereco = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
          if (endereco !== undefined) {
            setEnderecoUsuario(endereco[0]);
          }
        }
      } catch (err) {
        console.log('Erro' + err);
      }
    })();
  }, [location]);

  useEffect(() => {
    (async () => {
      try {
        if (enderecoEditado) {
          let endereco = await Location.geocodeAsync(`${enderecoUsuario}`);
          console.log(endereco);
        }
      } catch (err) {
        console.log('Erro' + err);
      }
    })();
  }, []);

  let texto = 'Aguardando...';
  if (errorMsg) {
    texto = errorMsg;
  } else if (location) {
    texto = JSON.stringify(location);
  }
  return (
    <>
      <Cabecalho titulo={'Taxa Delivery'} />
      {location && enderecoUsuario && (
        <Principal
          location={location}
          enderecoUsuario={enderecoUsuario}
          enderecoEditado={enderecoEditado}
          setEnderecoEditado={setEnderecoEditado}
        />
      )}
    </>
  );
}
