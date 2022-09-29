import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet,FlatList ,View, Text,TouchableOpacity} from 'react-native';
import axios from 'axios' //npm i axios

//componentes personalizados
import ItemUsuario from '/componentes/ItemUsuario'
//import Input from './componentes/Input'
export default function App() {

 const [listaUsuarios, setListaUsuarios] = useState([])
 const [nombre, setNombre] = useState('')
 const [email, setEmail] = useState('')
 const [id, setId] = useState('')
 //const [bandera, setBandera] = useState(false) 
 useEffect(() => {
    getUsuarios()
  }, [])

 const getUsuarios = async() => {
   const respuesta = await axios.get('http://192.168.1.5:5500/apicitas/index.php')
   setListaUsuarios(respuesta.data)
}

 const renderItem = ({ item }) => (
    <ItemUsuario id={item.id} getusuario={getUsuario}
       nombre={item.nombre} email={item.email} mypress={deleteUsuario}
    /> )

return (
   <View style={styles.container}>
      <View style={{flex:0.1, marginTop:20,marginBottom:25 }} >
         <Text style={{fontWeight:'bold',color:'#0E69E5', fontSize:20}}>
             CRUD REACT NATIVE PHP Y MYSQL
          </Text>
      </View> 
      <Input texto={"Nombre"} valor={nombre} campo={e=>setNombre(e)}/>
      <Input texto={"Email"} valor={email} campo={e=>setEmail(e)}/>
      <TouchableOpacity 
            style={{backgroundColor:'#0E69E5', padding:15,borderRadius:12}}
            onPress={addOrUpdate}  >
          //<Text style={{color:'#fff'}}>{bandera? "Edit":"Add"}</Text>
      </TouchableOpacity>

     <FlatList
        style={{marginTop:15}}
        data={listaUsuarios}
        renderItem={renderItem}
        keyExtractor={item =>item.id} 
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