import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text, TextInput, TouchableHighlight } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../../services/api';

import style from './styles';

export default function CreateTask() {
    const [name, setName] = useState('');
    const [completed, setCompleted] = useState('');
    const [priority, setPriority] = useState('');

    const navigation = useNavigation();

    async function handleRegister() {
      try {
        const token = await AsyncStorage.getItem('token');
        let complet = false

        if (completed === 'Sim') {
          complet = true;
        }

        const response = await api.post('tasks', {
          name: name,
          priority: priority.toLowerCase(), 
          completed: complet
          },
          { 
            headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        navigation.goBack();
      }
      catch (error) {
        console.log(error.message);
      }
    };

    return (
        <View style={style.container} >
            <TextInput style={style.textInput}
                placeholder="Nome da tarefa"
                value={name}
                onChangeText={setName}
                autoCorrect={false}
            />

            <TextInput style={style.textInput}
                placeholder="Prioridade (Alta | Baixa)"
                value={priority}
                onChangeText={setPriority}
                autoCorrect={false}
            />

            <TextInput style={style.textInput}
                placeholder="Completa (Sim | Não)"
                value={completed}
                onChangeText={setCompleted}
                autoCorrect={false}
            />

            <TouchableHighlight style={style.button} onPress={() => handleRegister()} >
                <Text style={style.buttonText}>Criar Task</Text>
            </TouchableHighlight>

        </View>
    );
} 