import React, { useEffect } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
} from 'react-native';

import { useState } from 'react';



const Posts = () => {
  const [data, setData] = useState([]);

  const getAPIdata = async() =>{
    const url = "https://jsonplaceholder.typicode.com/posts"
 let result = await fetch(url)
 result = await result.json();
 setData(result)
 console.log(result)
  }

  useEffect(()=>{
    getAPIdata()
  }, [])

  return (
   <View>
      {data.length? <FlatList data={data} renderItem={({item})=> 
      <View style={{borderBottomColor:"orange", borderBottomWidth:1, padding:10}}> 
        <Text style={{fontSize:24, backgroundColor:'orange'}}> {item.id}</Text>
        <Text style={{fontSize:15}}> {item.title}</Text>
        <Text style={{fontSize:15}}> {item.body}</Text>
      </View>} /> : null}
   </View>
  );
 
}

const styles = StyleSheet.create({
  main:{
    flex:1,
    alignItems:'center',
    justifyContent: 'center'
  },
  radioText:{
     
  }


})



export default Posts;
