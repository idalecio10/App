// useEffect Serve para disparar alguma Função em algum determinado momento do componente(EX: mostrar dados em tela)
import React, { useState, useEffect } from 'react';
// useHistory serve para gravar o historico do usuario e levar o usuario de volta para outra página
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './style.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    // Buscar o ID da ong do localStorage do Browser Application
    const ongId = localStorage.getItem('ongId');
    // Buscar o Nome da ong do localStorage do Browser Application
    const ongName = localStorage.getItem('ongName');

    //Para usar o useHistory
    const history = useHistory();

    //recebe 2 parametros {qual função que eu quero que seja executada} e [quando a função vai ser executada]
    useEffect(() => {
        //Daqui 
        //api.get('profile') - para pegar todos os incidents do profile
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            //Guardar Dados desta resposta (sempre se usa o useState, para guardar os dados)
            setIncidents(response.data);
        })
        //Até aqui é qual função que eu quero que seja executada

        //Aqui entre as [] é quando a função vai ser executada
        //Array de Dependencia(Toda vez q as informações dentro desse array mudar ele executa a função de cima de novo)
    }, [ongId]);

    //Function para Apagar Caso
    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });
            // Para Apagar em tempo Real sem ser preciso atualizar(ele procura quem tem esse preciso id que foi apagado e remover)
            setIncidents(incidents.filter(incident => incident.id !== id));
            //
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    }
    //

    //Function para fazer Logout
    function handleLogout() {
        //remover Dados de localStorage
        localStorage.clear();

        history.push('/');
    }
    //

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo Caso</Link>
                
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/> 
                </button>
            </header>
            
            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incident => ( //map serve pra percorrer cada um dos incidents retornando alguma coisa.
                    //quando se faz uma iteração(repetição), por exemplo um (map, ou for it), o primeiro elemento que vem logo do map da iteração, precisa colocar a propriedade key.
                    //key ajuda o React a saber qual Item é qual(Por exemplo quando quiser deletar, modificar, trocar de posição)
                    // NA key precisa colocar qual o valor único preciso para identificar cada um desses incidents, neste caso é o : id
                    
                    //Intl Para Formatação de datas e valores

                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>
                        
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}