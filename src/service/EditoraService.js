import { http } from './config';

export default {
    findAll: params => {
        return http.get('/editoras', { params });
    },
    save: editora => {
        return http.post('/editoras', editora);
    },
    update: editora => {
        return http.put('/editoras', editora);
    },
    delete: id => {
        return http.delete(`/editoras/${id}`);
    },
};
