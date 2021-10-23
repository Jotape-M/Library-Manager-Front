import { http } from './config';

export default {
    findAll: () => {
        return http.get('/livros');
    },
    save: livro => {
        return http.post('/livros', livro);
    },
    update: livro => {
        return http.put('/livros', livro);
    },
    delete: id => {
        return http.delete(`/livros/${id}`);
    },
};
