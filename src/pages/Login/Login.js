import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import logo from '../../../assets/logo.png';

import api from '../../services/api';

import style from './styles';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    async function handleLogin() {
        const response = await api.post('login', { email: email, password: password });

        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('userName', response.data.user.name);

        navigation.navigate('Profile');
    }

    async function handlePage(e) {
        try {
            navigation.navigate('Register');
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
                secureTextEntry={true}
                placeholder="Senha"
                type="password"
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                autoCorrect={false}
            />

            <TouchableHighlight style={style.button} onPress={() => handleLogin()} >
                <Text style={style.buttonText} > Entrar </Text>
            </TouchableHighlight>

            <TouchableOpacity style={style.signUp} onPress={() => handlePage()} >
                <Text style={style.signUpText}> Criar conta grátis </Text>
            </TouchableOpacity>

        </View>
    );
} 