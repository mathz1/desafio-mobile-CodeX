import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text, TextInput, TouchableHighlight } from 'react-native';

import logo from '../../assets/logo.png';

import style from './styles';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    function handleEmailChange(email) {
        setEmail({ email });
    }

    function handlePasswordChange(password) {
        setPassword({ password })
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
                value=""
                onChangeText={handleEmailChange}
                autoCapitalize="none"
                autoCorrect={false}
            />

            <TextInput style={style.textInput}
                placeholder="Senha"
                value=""
                onChangeText={handlePasswordChange}
                autoCapitalize="none"
                autoCorrect={false}
            />

            <TouchableHighlight style={style.button} >
                <Text style={style.buttonText} > Entrar </Text>
            </TouchableHighlight>

            <TouchableHighlight style={style.signUp}>
                <Text style={style.signUpText}> Criar conta grátis </Text>
            </TouchableHighlight>

        </View>
    );
} 