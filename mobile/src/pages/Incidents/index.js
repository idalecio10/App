import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
// TouchableOpacity - torna qualquer coisa clicavel e quando clicamos ele diminui a opacidade do q clicamos
// FlatList para fazer as Linstagens para faze Scrol(arrastar para baixo e para cima)
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

// Importar as Logos(Ele importa a logo no melhor formato da Tela que esta rodando a APP)
import logoImg from '../../assets/logo.png';

// Importar styles
import styles from './styles';


export default function Incidents() {
    const [incidents, setIncidents] = useState([]);
    //Novo status const para armazenar o Tatal de itens(Incidents)
    const [total, setTotal] = useState(0); 
    
    //Controlar o Número da Página no APP que esta no momento
    const [page, setPage] = useState(1);
    //Para armazenar uma informação quando estiver buscando dados novos para evitar q esses dados sejam buscados novamente(carregar 1 páfina por vez) 
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();  

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidents() {
        // Se loading tiver como True ele dá return, porque quero evitar enquanto outra requisação seja feita, que mais uma requesição venha acontecer  
        if (loading) {
            return;
        }

        // Se o Total for > 0 e o número de incidents que tem na Lista for == total, não faz sentido buscar mais informações, botar return
        if (total > 0 && incidents.length == total){
            return;
        }

        //senão o setLoading é verdadeiro, antes mesmo de começar a fazer a requisição
        setLoading(true);

        const response = await api.get('incidents', {
            params: { page }
        });

        //Anexar 2 vetores dentro de 1 vetor
        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        //Pular para próxima Página
        setPage(page + 1);
        // setLoading volta a falso
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia</Text>
        
            <FlatList
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                //Para Remover o Scroll que aparece em Tela
                showsVerticalScrollIndicator={false}
                //é uma funçao que é disparada no final da lista
                onEndReached={loadIncidents}
                //Ela fala quantos % do final da lista o usuario precisar estar para carregar novos itens
                onEndReachedThreshold={0.1}
                // Trocar o nome da variavel item por incident
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-AO', { 
                                style: 'currency', 
                                currency: 'AOA'
                            }).format(incident.value)}
                        </Text>

                        <TouchableOpacity 
                            style={styles.detailsButton}
                            onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}