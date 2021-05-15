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

    return (
        <View style={style.container} >
            <View style={style.header} >
                <Image source={logo} />
            </View>

            <Text style={style.title}>Bem vindo(a)!</Text>

            <FlatList
                style={style.incidentList}
                data={tasks}
                keyExtractor={task => String(task._id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadTasks}
                onEndReachedThreshold={0.2}
                renderItem={({ item: task }) => (
                    <View style={style.incident} >
                        <Text style={style.incidentProperty} >NOME:</Text>
                        <Text style={style.incidentValue} >{task.name}</Text>

                        <Text style={style.incidentProperty} >PRIORIDADE:</Text>
                        <Text style={style.incidentValue} >{task.priority}</Text>

                        <Text style={style.incidentProperty} >COMPLETA:</Text>
                        <Text style={style.incidentValue} >{completed(task.completed)}</Text>

                        <TouchableOpacity 
                            style={style.detailsButton} 
                            onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={style.detailsButtonText} >Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#6904A7" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}