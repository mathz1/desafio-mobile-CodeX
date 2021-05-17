import React, { useState, useEffect } from 'react';
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

    const [nameUp, setNameUp] = useState('');
    const [completedUp, setCompletedUp] = useState(false);
    const [priorityUp, setPriorityUp] = useState('');

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

    useEffect(() => {
      getData();
    }, []);

    async function handleUpdate() {
      try {
        const token = await AsyncStorage.getItem('token');
        const taskId = await AsyncStorage.getItem('TaskId');

        await api.put(`tasks/${taskId}`, {
          name: nameUp, priority: priorityUp, completed: completedUp }, { headers: {
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
          <Text style={style.labelText}>
              Nome:
          </Text>
          <TextInput style={style.textInput}
              placeholder={name}
              value={nameUp}
              onChangeText={setNameUp}
              autoCorrect={false}
          />

          <Text style={style.labelText}>
              Prioridade:
          </Text>
          <RNPickerSelect
            style={style}
            useNativeAndroidPickerStyle={false}
            onValueChange={(priorityUp) => setPriorityUp(priorityUp)}
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
            onValueChange={(completedUp) => setCompletedUp(completedUp)}
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