import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';

import logo from '../../../assets/logo.png';

import api from '../../services/api';

import style from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const navigation = useNavigation();

    async function handleRegister() {
      try {
        const response = await api.post('register', { name, email, password });

        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('userName', response.data.user.name);

        navigation.navigate('Profile');
      }
      catch (error) {
        console.log(error.message);
      }
    };

    async function handlePage() {
      try {
        navigation.goBack();
      } catch (error) {
        console.log(error.message);
      }
    };

    return (
        <View style={style.container} >
            <View style={style.header} >
                <Image source={logo} />
                <Text style={style.headerText} >
                    Crie sua conta e organize suas tarefas!
                </Text>
            </View>

            <TextInput style={style.textInput}
                placeholder="Nome"
                value={name}
                onChangeText={setName}
                autoCorrect={false}
            />

            <TextInput style={style.textInput}
                placeholder="Endereço de e-mail"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
            />

            <TextInput style={style.textInput}
                secureTextEntry={true}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                autoCorrect={false}
            />

            <TouchableHighlight style={style.button} onPress={() => handleRegister()} >
                <Text style={style.buttonText} > Criar conta </Text>
            </TouchableHighlight>

            <TouchableOpacity style={style.signUp} onPress={() => handlePage()} >
                <Text style={style.signUpText}> Já tenho uma conta </Text>
            </TouchableOpacity>

        </View>
    );
} 