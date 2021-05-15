import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { View, Image, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import logo from '../../../assets/logo.png';

import style from './styles';
import api from '../../services/api';

export default function Profile() {
    const [tasks, setTasks] = useState([]);
    const [total, setTotal] = useState(0);

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    async function loadTasks() {
        if (loading) {
            return;
        }

        setLoading(true);

        const token = await AsyncStorage.getItem('token');

        const response = await api.get('tasks', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (response.data.result.length > 0 && tasks.length === response.data.result.length) {
            return;
        }

        setTasks([ ...tasks, ...response.data.result ]);
        setTotal(response.data.result.length);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadTasks();
    }, []);

    function completed(bool) {
        if (bool) {
            return 'SIM';
        }
        return 'NÃO';
    }

    function handleCreateTask() {
        navigation.navigate('CreateTask');
    }

    async function handleLogout() {
        await AsyncStorage.clear();

        navigation.navigate('Login');
    }

    return (
        <View style={style.container} >
            <View style={style.header} >
                <Image source={logo} />
            </View>

            <Text style={style.title}>Bem vindo(a)!</Text>
            <View style={style.viewAdd} >
                <TouchableOpacity style={style.buttonAdd} onPress={() => handleCreateTask()} >
                    <Text style={style.description} >Cadastrar nova tarefa </Text>
                    <Feather style={style.description} name="plus" size={16} />
                </TouchableOpacity>

                <TouchableOpacity style={style.buttonAdd} onPress={() => handleLogout()} >
                    <Feather name="power" size={24} color="#6904A7"/>
                </TouchableOpacity>
            </View>

            <FlatList
                style={style.taskList}
                data={tasks}
                keyExtractor={task => String(task._id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadTasks}
                onEndReachedThreshold={0.2}
                renderItem={({ item: task }) => (
                    <View style={style.task} >
                        <Text style={style.taskProperty} >NOME:</Text>
                        <Text style={style.taskValue} >{task.name}</Text>

                        <Text style={style.taskProperty} >PRIORIDADE:</Text>
                        <Text style={style.taskValue} >{task.priority}</Text>

                        <Text style={style.taskProperty} >COMPLETA:</Text>
                        <Text style={style.taskValue} >{completed(task.completed)}</Text>

                        <TouchableOpacity 
                            style={style.detailsButton} 
                            onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={style.detailsButtonText} >Atualizar tarefa</Text>
                            <Feather name="arrow-right" size={16} color="#6904A7" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}