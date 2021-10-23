import { http } from './config';

export default {
    findAll: () => {
        return http.get('/usuarios');
    },
    save: usuario => {
        return http.post('/usuarios', usuario);
    },
    update: usuario => {
        return http.put('/usuarios', usuario);
    },
    delete: id => {
        return http.delete(`/usuarios/${id}`);
    },
};
