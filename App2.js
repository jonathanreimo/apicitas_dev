import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

const URL="http://127.0.0.1:3306/usuario"

//Componentes

import Card from '/components/Card'

export default function App() {
  const [ listaUsuarios, setListaUsuario ] = useState([])

  useEffect(() => {
    getusuarios()
  },[])

  const getusuarios = async() => {
    const { data } = await axios.get(URL)
    const { usuarios } = data
    setListaUsuario(usuarios)
    console.log(data)
  }

  const renderItem = ( { item } ) => (
      <Card nombre={item.name} email={item.email} />
    )
  
  return (
    <View style={styles.container}>
      <View style={{flex: 0.2, backgroundCOlor: 'steelblue'}}>
        <Text style={styles.title}>Usuarios</Text>
      </View>

      <FlatList 
        data={listaUsuarios}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      
      <StatusBar style="auto" />
    </View>
  );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
