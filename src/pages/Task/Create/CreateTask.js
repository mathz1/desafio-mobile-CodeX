import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text, TextInput, TouchableHighlight, AsyncStorage } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {Picker} from '@react-native-picker/picker';

import api from '../../../services/api';

import style from './styles';

export default function CreateTask() {
    const [name, setName] = useState('');

    const [selectedLanguage, setSelectedLanguage] = useState();

    const navigation = useNavigation();

    async function handleRegister(e) {
      try {
        navigation.navigate('Login');
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
                autoCapitalize="none"
                autoCorrect={false}
            />

            <View style={style.label} >
              <Text style={style.labelText} >
                Prioridade
              </Text>
              <Picker
                style={style.picker}
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedLanguage(itemValue)
                }>
                <Picker.Item label="Alta" value="ALTA" />
                <Picker.Item label="Baixa" value="BAIXA" />
              </Picker>
            </View>

            <View style={style.label} >
              <Text style={style.labelText} >
                Finalizada
              </Text>
              <Picker
                style={style.picker}
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedLanguage(itemValue)
                }>
                <Picker.Item label="Sim" value="SIM" />
                <Picker.Item label="Não" value="NÃO" />
              </Picker>
            </View>

            <TouchableHighlight style={style.button} onPress={() => handleRegister()} >
                <Text style={style.buttonText} > Criar Task </Text>
            </TouchableHighlight>

        </View>
    );
} 