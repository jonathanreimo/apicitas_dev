import React from 'react'
import {StyleSheet,Text, View, TouchableOpacity} from 'react-native';
const ItemFolio = (props) => (
    <View style={styles.cardView}>
       <Text style={{textTransform: 'uppercase', fontWeight:'bold'}}>
             {props.nombref}
       </Text>
       <Text style={{textTransform: 'uppercase', color:'green'}} >
            {props.edicionf}
       </Text>
       <Text style={{textTransform: 'uppercase', color:'green'}} >
            {props.idf}
       </Text> 

   </View>
  );
  
const styles = StyleSheet.create({
    cardView: {
        backgroundColor: "white",
        borderRadius: 20,
        color:"#0E69E5",
        marginVertical:5,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      }

});

  export default ItemFolio;