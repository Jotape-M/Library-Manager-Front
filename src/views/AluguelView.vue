<template>
    <div>
        <v-card>
            <v-data-table
                :headers="headers"
                :items="alugueis"
                :items-per-page="pageSize"
                :search="search"
                hide-default-footer
                :loading="loading"
                class="elevation-1"
            >
                <template v-slot:top>
                    <v-toolbar flat class="blue-grey darken-3">
                        <v-toolbar-title class="white--text">Editoras</v-toolbar-title>
                        <v-divider class="mx-4 white" inset vertical></v-divider>
                        <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                            class="white--text"
                            color="white"
                        ></v-text-field>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog" max-width="500px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                                    Novo Aluguel
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title class="blue-grey darken-3">
                                    <span class="text-h5 white--text">{{ formTitle }}</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-form ref="form">
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12">
                                                    <v-select
                                                        v-model="aluguel.livroId"
                                                        :items="livros"
                                                        item-text="nome"
                                                        item-value="id"
                                                        label="Escolha um livro"
                                                        outlined
                                                    >
                                                        <template slot="selection" slot-scope="livros">
                                                            <strong>ID:</strong> {{ livros.item.id }} -
                                                            <strong> Nome:</strong> {{ livros.item.nome }}
                                                        </template>
                                                        <template slot="item" slot-scope="livros">
                                                            {{ livros.item.id }} - {{ livros.item.nome }}
                                                        </template>
                                                    </v-select>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="12">
                                                    <v-select
                                                        v-model="aluguel.usuarioId"
                                                        :items="usuarios"
                                                        item-text="nome"
                                                        item-value="id"
                                                        label="Escolha um livro"
                                                        outlined
                                                    >
                                                        <template slot="selection" slot-scope="usuarios">
                                                            <strong>ID:</strong> {{ usuarios.item.id }} -
                                                            <strong> Nome:</strong> {{ usuarios.item.nome }}
                                                        </template>
                                                        <template slot="item" slot-scope="usuarios">
                                                            {{ usuarios.item.id }} - {{ usuarios.item.nome }}
                                                        </template>
                                                    </v-select>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="12">
                                                    <v-menu
                                                        v-model="menu"
                                                        :close-on-content-click="false"
                                                        :nudge-right="40"
                                                        transition="scale-transition"
                                                        offset-y
                                                        min-width="auto"
                                                    >
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field
                                                                v-model="aluguel.dataAluguel"
                                                                label="Lançamento"
                                                                append-icon="mdi-calendar"
                                                                readonly
                                                                outlined
                                                                hint="Selecione a data de lançamento"
                                                                v-bind="attrs"
                                                                @blur="dateAluguel = parseDate(dateFormatted)"
                                                                v-on="on"
                                                            ></v-text-field>
                                                        </template>
                                                        <v-date-picker
                                                            v-model="dateAluguel"
                                                            @input="menu = false"
                                                            no-title
                                                            scrollable
                                                        ></v-date-picker>
                                                    </v-menu>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="12">
                                                    <v-menu
                                                        v-model="menu"
                                                        :close-on-content-click="false"
                                                        :nudge-right="40"
                                                        transition="scale-transition"
                                                        offset-y
                                                        min-width="auto"
                                                    >
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field
                                                                v-model="aluguel.dataPrevisao"
                                                                label="Lançamento"
                                                                append-icon="mdi-calendar"
                                                                readonly
                                                                outlined
                                                                hint="Selecione a data de lançamento"
                                                                v-bind="attrs"
                                                                @blur="datePrevisao = parseDate(dateFormatted)"
                                                                v-on="on"
                                                            ></v-text-field>
                                                        </template>
                                                        <v-date-picker
                                                            v-model="datePrevisao"
                                                            @input="menu = false"
                                                            no-title
                                                            scrollable
                                                        ></v-date-picker>
                                                    </v-menu>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="12">
                                                    <v-menu
                                                        v-model="menu"
                                                        :close-on-content-click="false"
                                                        :nudge-right="40"
                                                        transition="scale-transition"
                                                        offset-y
                                                        min-width="auto"
                                                    >
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field
                                                                v-model="aluguel.dataDevolucao"
                                                                label="Lançamento"
                                                                append-icon="mdi-calendar"
                                                                readonly
                                                                outlined
                                                                hint="Selecione a data de lançamento"
                                                                v-bind="attrs"
                                                                @blur="dateDevolucao = parseDate(dateFormatted)"
                                                                v-on="on"
                                                            ></v-text-field>
                                                        </template>
                                                        <v-date-picker
                                                            v-model="dateDevolucao"
                                                            @input="menu = false"
                                                            no-title
                                                            scrollable
                                                        ></v-date-picker>
                                                    </v-menu>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-form>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">
                                        Cancelar
                                    </v-btn>
                                    <v-btn color="blue darken-1" text @click="save">
                                        Salvar
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-dialog v-model="dialogDelete" max-width="500px">
                            <v-card>
                                <v-card-title class="text-h5">Você realmente deseja excluir esse item?</v-card-title>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">Confirmar</v-btn>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon small class="mr-2" @click="editItem(item)">
                        mdi-pencil
                    </v-icon>
                    <v-icon small @click="deleteItem(item)">
                        mdi-delete
                    </v-icon>
                </template>
                <template v-slot:no-data>
                    <v-btn color="primary" @click="initialize">
                        Reset
                    </v-btn>
                </template>
            </v-data-table>
        </v-card>
        <v-divider class="white"></v-divider>
        <v-card>
            <v-col cols="12">
                <v-row>
                    <v-col cols="4" sm="4">
                        <v-select
                            v-model="pageSize"
                            :items="pageSizes"
                            label="Items por Pagina"
                            @change="handlePageSizeChange"
                            outlined
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="8">
                        <v-pagination
                            v-model="page"
                            :length="totalPages"
                            total-visible="7"
                            next-icon="mdi-menu-right"
                            prev-icon="mdi-menu-left"
                            @input="handlePageChange"
                        ></v-pagination>
                    </v-col>
                </v-row>
            </v-col>
        </v-card>
    </div>
</template>

<script>
import aluguelService from '../service/AluguelService';
import usuarioService from '../service/UsuarioService';
import livroService from '../service/LivroService';

export default {
    name: 'App',

    data: () => ({
        dialog: false,
        dialogDelete: false,
        loading: true,
        search: '',
        alugueis: [],
        livro: [],
        usuarios: [],
        dateAluguel: '',
        datePrevisao: '',
        dateDevolucao: '',
        dateFormatted: '',
        totalAlugueis: 0,
        page: 1,
        totalPages: 0,
        pageSize: 5,
        pageSizes: [5, 10, 15],
        aluguel: {
            id: null,
            usuarioId: null,
            usuario: {},
            livroId: null,
            livro: {},
            dataAluguel: '',
            dataPrevisao: '',
            dataDevolucao: '',
        },
        headers: [
            {
                text: 'ID',
                align: 'start',
                sortable: true,
                value: 'id',
            },
            { text: 'Livro', value: 'livro.nome' },
            { text: 'Usuário', value: 'usuario.nome' },
            { text: 'Aluguel', value: 'dataAluguel' },
            { text: 'Previsão', value: 'dataPrevisao' },
            { text: 'Devolução', value: 'dataDevolucao' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        rules: [
            value => !!value || 'Campo obrigatório',
            value => (value && value.length >= 3) || 'No mínimo 3 caracteres',
            value => (value && value.length <= 40) || 'No máximo 40 caracteres',
        ],
    }),

    computed: {
        formTitle() {
            return !this.aluguel.id ? 'Nova editora' : 'Editar editora';
        },
    },

    watch: {
        dialog(val) {
            val || this.close();
        },

        dialogDelete(val) {
            val || this.closeDelete();
        },

        dateAluguel(val) {
            this.aluguel.dataAluguel = this.formatDate(this.dateAluguel);
        },

        datePrevisao(val) {
            this.aluguel.dataPrevisao = this.formatDate(this.datePrevisao);
        },

        dateDevolucao(val) {
            this.aluguel.dataDevolucao = this.formatDate(this.dateDevolucao);
        },
    },

    created() {
        this.initialize();
        this.findAllLivros();
        this.findAllUsuarios();
    },

    methods: {
        initialize() {
            const params = this.getRequestParams(this.page, this.pageSize);
            this.loading = true;
            aluguelService.findAll(params).then(res => {
                console.log(res.data);
                const { totalElements, totalPages, content } = res.data;
                this.alugueis = content;
                this.totalAlugueis = totalElements;
                this.totalPages = totalPages;
                this.loading = false;
            });
        },

        getRequestParams(page, pageSize) {
            let params = {};

            if (page) {
                params['page'] = page - 1;
            }

            if (pageSize) {
                params['size'] = pageSize;
            }

            return params;
        },

        handlePageChange(value) {
            this.page = value;
            this.initialize();
        },

        handlePageSizeChange(size) {
            this.pageSize = size;
            this.page = 1;
            this.initialize();
        },

        editItem(item) {
            this.aluguel.id = item.id;
            this.aluguel.usuarioId = item.usuario.id;
            this.aluguel.usuario = item.usuario;
            this.aluguel.livroId = item.livro.id;
            this.aluguel.livro = item.livro;
            this.aluguel.dataAluguel = item.dataAluguel;
            this.aluguel.dataPrevisao = item.dataPrevisao;
            this.aluguel.dataDevolucao = item.dataDevolucao;
            this.dialog = true;
        },

        deleteItem(item) {
            this.aluguel = { ...item };
            this.dialogDelete = true;
        },

        deleteItemConfirm() {
            aluguelService.delete(this.aluguel.id).then(() => {
                this.aluguel = {};
                this.initialize();
            });
            this.dialogDelete = false;
        },

        close() {
            this.dialog = false;
            this.$refs.form.resetValidation();
            if (!this.dialog) {
                this.aluguel = {};
            }
        },

        closeDelete() {
            this.dialogDelete = false;
        },

        save() {
            if (this.$refs.form.validate()) {
                if (!this.aluguel.id) {
                    aluguelService.update(this.aluguel).then(() => {
                        this.aluguel = {};
                        this.initialize();
                    });
                } else {
                    aluguelService.save(this.aluguel).then(() => {
                        this.aluguel = {};
                        this.initialize();
                    });
                }
                this.aluguel = {};
                this.close();
            }
        },

        findAllLivros() {
            livroService.findAll().then(res => {
                this.livros = res.data.content;
            });
        },

        findAllUsuarios() {
            usuarioService.findAll().then(res => {
                this.usuarios = res.data.content;
            });
        },

        formatDate(date) {
            if (!date) return null;

            const [year, month, day] = date.split('-');
            return `${day}-${month}-${year}`;
        },

        parseDate(date) {
            if (!date) return null;

            const [month, day, year] = date.split('/');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        },
    },
};
</script>
