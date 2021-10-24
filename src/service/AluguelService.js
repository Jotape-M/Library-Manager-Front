import { http } from './config';

export default {
    findAll: params => {
        return http.get('/alugueis', { params });
    },
    save: editora => {
        return http.post('/alugueis', editora);
    },
    update: editora => {
        return http.put('/alugueis', editora);
    },
    delete: id => {
        return http.delete(`/alugueis/${id}`);
    },
};
