import React, { useState, useEffect } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { View, Image, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import logo from '../../../assets/logo.png';

import style from './styles';
import api from '../../services/api';

export default function Profile() {
    const [tasks, setTasks] = useState([]);
    const isFocused = useIsFocused();

    const navigation = useNavigation();

    useEffect(() => {
        loadTasks();
        async function loadTasks() {
            const token = await AsyncStorage.getItem('token');
    
            await api.get('tasks', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(response => {
                setTasks(response.data.result);
            });
        }
    }, [tasks.length, isFocused]);

    function completed(bool) {
        if (bool) {
            return 'SIM';
        }
        return 'NÃO';
    }

    function handleCreateTask() {
        navigation.navigate('CreateTask');
    }
    
    function handleUpdateTask(id) {
        AsyncStorage.setItem('TaskId', id);
        navigation.navigate('UpdateTask');
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
                renderItem={({ item: task }) => (
                    <View style={style.task} >
                        <View style={style.delete} >
                            <Text style={style.taskProperty} >NOME:</Text>
                            
                            <TouchableOpacity onPress={() => handleDeleteTask(task._id)} >
                                <Feather name="trash-2" size={16} color="#6904A7" />
                            </TouchableOpacity>
                        </View>
                        <Text style={style.taskValue} >{task.name}</Text>

                        <Text style={style.taskProperty} >PRIORIDADE:</Text>
                        <Text style={style.taskValue} >{task.priority}</Text>

                        <Text style={style.taskProperty} >COMPLETA:</Text>
                        <Text style={style.taskValue} >{completed(task.completed)}</Text>

                        <TouchableOpacity 
                            style={style.detailsButton} 
                            onPress={() => handleUpdateTask(task._id)}
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