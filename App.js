import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View, Text, TextInput, Button, TouchableOpacity, Alert, Modal, Pressable} from 'react-native';
import axios from 'axios' //npm i axios
import { StackNavigator } from 'react-navigation';
//componentes personalizados
import ItemLibro from './components/ItemLibro'
import Input from './components/Input'
export default function App() {

 const [listaLibros, setListaLibros] = useState([])
 const [nombre, setNombre] = useState('')
 const [edicion, setEdicion] = useState('')
 const [id, setId] = useState('')
 const [bandera, setBandera] = useState(false) 
 useEffect(() => {
    getLibros()
  }, [])



 const getLibros = async() => {
   const respuesta = await axios.get('https://apiss.zio.mx/apicitas_api/')
   setListaLibros(respuesta.data)
}

 const addLibro = async() => {
  const obj = {nombre, edicion}
  const respuesta = await axios.post('https://apiss.zio.mx/apicitas_api/', obj)
  alert(respuesta.data.msg)
  getLibros()
  setNombre('')
  setEdicion('')
}

const deleteLibro = async (props) => {
  const id = props.id
  const respuesta = await axios.delete('https://apiss.zio.mx/apicitas_api/index.php?id='+id)
  alert(respuesta.data.msg)
  getLibros()
}

const getLibro = async(props) => {
  const id = props.id
  const respuesta = await axios.get('https://apiss.zio.mx/apicitas_api/?id='+id)
  setId(respuesta.data.id)
  setNombre(respuesta.data.nombre)
  setEdicion(respuesta.data.edicion)
  setBandera(!bandera)
} 

const updateLibro = async() => {
  const obj = {id, nombre, edicion} 
  const respuesta = await axios.put('https://apiss.zio.mx/apicitas_api/index.php',obj)
  alert(respuesta.data.msg)
  setId('') 
  setNombre('')
  setEdicion('')
  setBandera(false)
  getLibros()
} 



/*const addOrUpdate = () => {
 {bandera? updateLibro() : addLibro() }
}*/

 const renderItem = ({ item }) => (
    <ItemLibro id={item.id} getlibro={getLibro}
       nombre={item.nombre} edicion={item.edicion} mypress={deleteLibro}
    /> )


    const [modalVisible, setModalVisible] = useState(false); 

return (
   <View style={styles.container}>
      <View style={{flex:0.1, marginTop:20,marginBottom:25 }} >
         <Text style={{fontWeight:'bold',color:'#0E69E5', fontSize:20}}>
             App
          </Text>
      </View> 

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>slots</Text>
            <FlatList
        style={{marginTop:15}}
        data={listaLibros}
        renderItem={renderItem}
        keyExtractor={item =>item.id} 
      />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cerrar Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Abrir Modal</Text>
      </Pressable>


      <Input texto={"Nombre"} valor={nombre} campo={e=>setNombre(e)}/>
      <Input texto={"Edicion"} valor={edicion} campo={e=>setEdicion(e)}/>
      <TouchableOpacity 
            style={{backgroundColor:'#0E69E5', padding:15,borderRadius:12}}
            onPressIn={addLibro} onPress={() => setModalVisible(!modalVisible)} >
          <Text style={{color:'#fff'}}>Siguiente</Text>
      </TouchableOpacity>

     
      <StatusBar style="auto" />
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-evenly',
  },

  modalView: {
   margin: 20,
   backgroundColor: "white",
   borderRadius: 20,
   padding: 35,
   alignItems: "center",
   shadowColor: "#000",
   shadowOffset: {
     width: 0,
     height: 2
   },
   shadowOpacity: 0.25,
   shadowRadius: 4,
   elevation: 5
 },
 button: {
   borderRadius: 20,
   padding: 10,
   elevation: 2
 },
 buttonOpen: {
   backgroundColor: "#F194FF",
   /*isplay: "none",*/
 },
 buttonClose: {
   backgroundColor: "#2196F3",
 },
 textStyle: {
   color: "white",
   fontWeight: "bold",
   textAlign: "center"
 },
 modalText: {
   marginBottom: 15,
   textAlign: "center"
 }
});