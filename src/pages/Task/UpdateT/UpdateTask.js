import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableHighlight } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../../services/api';

import style from './styles';
import { color } from 'react-native-reanimated';

export default function UpdateTask() {
    const [name, setName] = useState('');
    const [completed, setCompleted] = useState(false);
    const [priority, setPriority] = useState('');

    const navigation = useNavigation();
    
    async function getData() {
      try {
        const token = await AsyncStorage.getItem('token');
        const taskId = await AsyncStorage.getItem('TaskId');
  
        const response = await api.get(`tasks/${taskId}`, { headers: {
          Authorization: `Bearer ${token}`,
        } } );
        setName(response.data.task.name);
        setCompleted(response.data.task.completed);
        setPriority(response.data.task.priority);
      } catch (error) {
        console.log(error);
      }
    };

    getData();

    async function handleUpdate() {
      try {
        const token = await AsyncStorage.getItem('token');
        const taskId = await AsyncStorage.getItem('TaskId');

        await api.put(`tasks/${taskId}`, {
           name, priority, completed }, { headers: {
            Authorization: `Bearer ${token}`,
          } } );

          navigation.goBack();
      }
      
      catch (error) {
        console.log(error.message);
      }
    };

    return (
        <View style={style.container} >
          <TextInput style={style.textInput}
              placeholder={name}
              onChangeText={setName}
              autoCorrect={false}
          />

          <Text style={style.labelText}>
              Prioridade:
          </Text>
          <RNPickerSelect
            style={style}
            useNativeAndroidPickerStyle={false}
            onValueChange={(priority) => setPriority(priority)}
            items={[
                { label: "Alta", value: "ALTA" },
                { label: "Baixa", value: "BAIXA" },
            ]}
          />

          <Text style={style.labelText}>
              Finalizada:
          </Text>
          <RNPickerSelect
            style={style}            
            useNativeAndroidPickerStyle={false}            
            onValueChange={(completed) => setCompleted(completed)}
            items={[
                { label: "Sim", value: true },
                { label: "Não", value: false },
            ]}
          />

          <TouchableHighlight style={style.button} onPress={() => handleUpdate()} >
              <Text style={style.buttonText}>Atualizar Task</Text>
          </TouchableHighlight>
        </View>
    );
} 