import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text, TextInput, TouchableHighlight, AsyncStorage } from 'react-native';

import logo from '../../../assets/logo.png';

import api from '../../services/api';

import style from './styles';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    async function handleLogin(e) {
        try {
            navigation.navigate('Profile');
        }
        catch (error) {
            console.log(error.message);
        }
    }

    return (
        <View style={style.container} >
            <View style={style.header} >
                <Image source={logo} />
                <Text style={style.headerText} >
                    Acesse sua conta e organize suas tarefas!
                </Text>
            </View>

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

            <TouchableHighlight style={style.button} onPress={() => handleLogin()} >
                <Text style={style.buttonText} > Entrar </Text>
            </TouchableHighlight>

            <TouchableHighlight style={style.signUp}>
                <Text style={style.signUpText}> Criar conta grátis </Text>
            </TouchableHighlight>

        </View>
    );
} 