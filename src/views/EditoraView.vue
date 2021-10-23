<template>
    <v-data-table :headers="headers" :items="editoras" :loading="loading" sort-by="calories" class="elevation-1">
        <template v-slot:top>
            <v-toolbar flat class="blue-grey darken-3">
                <v-toolbar-title class="white--text">Editoras</v-toolbar-title>
                <v-divider class="mx-4 white" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                            Nova Editora
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
                                                v-model="editora.nome"
                                                label="Nome"
                                                :rules="rules"
                                                outlined
                                                hint="Digite o nome da editora"
                                                counter="40"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field
                                                v-model="editora.cidade"
                                                label="Cidade"
                                                :rules="rules"
                                                outlined
                                                hint="Digite a cidade da editora"
                                                counter="40"
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
        <template v-slot:item.actions="{ item }">
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
</template>

<script>
import editoraService from '../service/EditoraService';

export default {
    name: 'App',

    data: () => ({
        dialog: false,
        dialogDelete: false,
        loading: true,
        editoras: [],
        totalEditoras: 0,
        editora: {
            id: null,
            nome: '',
            cidade: '',
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
            return !this.editora.id ? 'Nova editora' : 'Editar editora';
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
            editoraService.findAll().then(res => {
                this.editoras = res.data.content;
                this.totalEditoras = res.data.totalElements;
                this.loading = false;
            });
        },

        editItem(item) {
            this.editora = { ...item };
            this.dialog = true;
        },

        deleteItem(item) {
            this.editora = { ...item };
            this.dialogDelete = true;
        },

        deleteItemConfirm() {
            editoraService.delete(this.editora.id).then(() => {
                this.editora = {};
                this.initialize();
            });
            this.dialogDelete = false;
        },

        close() {
            this.dialog = false;
            this.$refs.form.resetValidation();
            if (!this.dialog) {
                this.editora = {};
            }
        },

        closeDelete() {
            this.dialogDelete = false;
        },

        save() {
            if (this.$refs.form.validate()) {
                if (!this.editora.id) {
                    editoraService.update(this.editora).then(() => {
                        this.editora.nome = '';
                        this.editora.cidade = '';
                        this.initialize();
                    });
                } else {
                    editoraService.save(this.editora).then(() => {
                        this.editora.nome = '';
                        this.editora.cidade = '';
                        this.initialize();
                    });
                }
                this.editora = {};
                this.close();
            }
        },
    },
};
</script>
