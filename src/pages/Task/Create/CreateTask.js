import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableHighlight } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../../services/api';

import style from './styles';

export default function CreateTask() {
    const [name, setName] = useState('');
    const [completed, setCompleted] = useState(false);
    const [priority, setPriority] = useState('');

    const navigation = useNavigation();

    async function handleRegister() {
      try {
        const token = await AsyncStorage.getItem('token');

        await api.post('tasks', {
           name, priority, completed }, { headers: {
            Authorization: `Bearer ${token}`,
          } } );

          navigation.navigate('Profile');
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

          <TouchableHighlight style={style.button} onPress={() => handleRegister()} >
              <Text style={style.buttonText}>Criar Task</Text>
          </TouchableHighlight>
        </View>
    );
} 