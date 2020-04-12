import axios from 'axios';

const api = axios.create({
    // Aqui usar sempre o IP do PC que se esta a usar
    baseURL: 'http://192.168.33.5:3333'
});

export default api;