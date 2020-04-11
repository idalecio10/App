// useState server para usar status(estados em React)
import React, {useState} from 'react';

//Serve para trocar o <a href="/" </a> por <Link to="/" </Link>
// useHistory serve para gravar o historico do usuario e levar o usuario de volta para outra página
import { Link, useHistory } from 'react-router-dom';

//Importar icons do Site Feather (mas antes já deve instalar o pacotes de icons no React (npm install react-icons))
import { FiLogIn } from 'react-icons/fi';

import './style.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

// Serve para connectar o arquivo api.js, para fazer a conexão entre backend e frontend
import api from '../../services/api';

export default function Login() {
    const [id, setId] = useState('');

    //Para usar o useHistory
    const history = useHistory();

    // Esta funcion vai ser responsáqvel por fazer o cadastro do Usuário
    // (e) Serve para receber o event do Submit do form(Formulário)
    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });
            
            // localStorage.setItem('') : é preciso ter o ID disponivel em toda a Aplicação
            // localStorage faz com que o Browser guarde esses dados, no caso(ongId e ongName)
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            // history.push('/'); levar o usuario de volta para outra página
            history.push('/profile');

            //console.log(response.data.name);
        } catch (err) {
            alert('Falha no Login, tente novamente');
        }
    }

    return(
        <div className="login-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>

                <form onSubmit={handleLogin}>
                    <h1> Faça seu Login </h1>

                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />

                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho Cadastro
                    </Link>
                </form>

            </section>

            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}