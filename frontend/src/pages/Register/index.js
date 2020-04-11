// useState server para usar status(estados em React)
import React, {useState } from 'react';
// useHistory serve para gravar o historico do usuario e levar o usuario de volta para outra página
import { Link, useHistory } from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

// Serve para connectar o arquivo api.js, para fazer a conexão entre backend e frontend
import api from '../../services/api';

import './style.css';

import logoImg from '../../assets/logo.svg';


export default function Register() {
    // Armazenar cada um dos input do Form dentro de um state(estado).
    //dentro das [valor,funcao para atualizar o valor ]
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    
    //Para usar o useHistory
    const history = useHistory();

    // Esta funcion vai ser responsáqvel por fazer o cadastro do Usuário
    // (e) Serve para receber o event do Submit do form(Formulário)
    async function handleRegister(e){
        // e.preventDefault() -  serve para prevenir o comportamento padrão, para que o formulário não recarregue
        e.preventDefault();

        /*Para vermos isso no DOM do Browser(Inspecionar Elemento)
        console.log({
            name,
            email,whatsapp,
            city,
            uf,
        })*/

        const data = {
            name,
            email,whatsapp,
            city,
            uf,
        };

        //Enviar esses dados para a API usando a Routa exata
        try {
            const response = await api.post('ongs', data);

            alert(`Seu ID de acesso: ${response.data.id}`);
        
            // history.push('/'); levar o usuario de volta para outra página
            history.push('/');
        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos de sua ONG.</p>
                    
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Não tenho Cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <input 
                        type="email" 
                        placeholder="E-mail" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input 
                        placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input 
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />

                        <input 
                            placeholder="UF" 
                            style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                            />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}