import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text, TextInput, TouchableHighlight, AsyncStorage } from 'react-native';

import logo from '../../../assets/logo.png';

import api from '../../services/api';

import style from './styles';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const navigation = useNavigation();

    async function handleRegister(e) {
      try {
        navigation.navigate('Login');
      }
      catch (error) {
        console.log(error.message);
      }
    };

    async function handlePage(e) {
      try {
        navigation.navigate('CreateTask');
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
                autoCapitalize="none"
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
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                autoCorrect={false}
            />

            <TouchableHighlight style={style.button} onPress={() => handleRegister()} >
                <Text style={style.buttonText} > Criar conta </Text>
            </TouchableHighlight>

            <TouchableHighlight style={style.signUp} onPress={() => handlePage()} >
                <Text style={style.signUpText}> Já tenho uma conta </Text>
            </TouchableHighlight>

        </View>
    );
} 