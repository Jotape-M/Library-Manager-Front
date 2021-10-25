<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="usuarios"
            :loading="loading"
            sort-by="calories"
            class="elevation-1"
            hide-default-footer
        >
            <template v-slot:top>
                <v-toolbar flat class="blue-grey darken-3">
                    <v-toolbar-title class="white--text">Usuários</v-toolbar-title>
                    <v-divider class="mx-4 white" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                        <template
                            v-slot:activator="{
                                on,
                                attrs,
                            }"
                        >
                            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                                Novo Usuário
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
                                                <v-text-field
                                                    v-model="usuario.nome"
                                                    label="Nome"
                                                    :rules="[rules.required, rules.counterMin, rules.counterMax40]"
                                                    outlined
                                                    hint="Digite o nome da usuario"
                                                    counter="40"
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-text-field
                                                    v-model="usuario.cidade"
                                                    label="Cidade"
                                                    :rules="[rules.required, rules.counterMin, rules.counterMax40]"
                                                    outlined
                                                    hint="Digite a cidade da usuario"
                                                    counter="40"
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-text-field
                                                    v-model="usuario.endereco"
                                                    label="Endereço"
                                                    :rules="[rules.required, rules.counterMin, rules.counterMax50]"
                                                    outlined
                                                    hint="Digite a cidade da usuario"
                                                    counter="50"
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-text-field
                                                    v-model="usuario.email"
                                                    label="Email"
                                                    :rules="[rules.email, rules.counterMax50]"
                                                    outlined
                                                    hint="Digite a cidade da usuario"
                                                    counter="50"
                                                ></v-text-field>
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
        <v-divider class="white"></v-divider>
        <v-col cols="12">
            <v-row>
                <v-col cols="4" sm="4">
                    <v-select
                        v-model="pageSize"
                        :items="pageSizes"
                        label="Items por Página"
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
    </div>
</template>

<script>
import UsuarioService from '../service/UsuarioService';

export default {
    name: 'App',

    data: () => ({
        dialog: false,
        dialogDelete: false,
        loading: true,
        usuarios: [],
        totalusuarios: 0,
        page: 1,
        totalPages: 0,
        pageSize: 5,
        pageSizes: [5, 10, 15],
        usuario: {
            id: null,
            nome: '',
            cidade: '',
            endereco: '',
            email: '',
        },
        headers: [
            {
                text: 'ID',
                align: 'start',
                sortable: true,
                value: 'id',
            },
            { text: 'Nome', value: 'nome' },
            { text: 'Cidade', value: 'cidade' },
            {
                text: 'Endereço',
                value: 'endereco',
            },
            { text: 'Email', value: 'email' },
            {
                text: 'Actions',
                value: 'actions',
                sortable: false,
            },
        ],
        rules: {
            required: value => !!value || 'Campo obrigatório',
            counterMin: value => (value && value.length >= 3) || 'No mínimo 3 caracteres',
            counterMax40: value => (value && value.length <= 40) || 'No máximo 40 caracteres',
            counterMax50: value => (value && value.length <= 50) || 'No máximo 50 caracteres',
            email: value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return pattern.test(value) || 'E-mail invalido.';
            },
        },
    }),

    computed: {
        formTitle() {
            return !this.usuario.id ? 'Novo Usuário' : 'Editar Usuário';
        },
    },

    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        },
    },

    created() {
        this.initialize();
    },

    methods: {
        initialize() {
            this.loading = true;
            const params = this.getRequestParams();
            UsuarioService.findAll(params).then(res => {
                const { content, totalElements, totalPages } = res.data;
                this.usuarios = content;
                this.totalusuarios = totalElements;
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
            this.usuario = { ...item };
            this.dialog = true;
        },

        deleteItem(item) {
            this.usuario = { ...item };
            this.dialogDelete = true;
        },

        deleteItemConfirm() {
            UsuarioService.delete(this.usuario.id).then(() => {
                this.usuario = {};
                this.initialize();
            });
            this.dialogDelete = false;
        },

        close() {
            this.dialog = false;
            this.$refs.form.resetValidation();
            if (!this.dialog) {
                this.usuario = {};
            }
        },

        closeDelete() {
            this.dialogDelete = false;
        },

        save() {
            if (this.$refs.form.validate()) {
                if (!this.usuario.id) {
                    UsuarioService.update(this.usuario).then(() => {
                        this.usuario = {};
                        this.initialize();
                    });
                } else {
                    UsuarioService.save(this.usuario).then(() => {
                        this.usuario = {};
                        this.initialize();
                    });
                }
                this.usuario = {};
                this.close();
            }
        },
    },
};
</script>
