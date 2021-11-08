<template>
    <v-container>
        <v-row>
            <!-- Graphics -->
            <v-col>
                <v-card class="rounded" elevation="6">
                    <v-card-title class="blue-grey darken-3 white--text">Status dos Alugueis</v-card-title>
                    <div id="chart">
                        <apexchart v-if="!show" type="bar" width="450" :options="chartOptions" :series="series"></apexchart>
                    </div>
                </v-card>
            </v-col>
            <!-- Latest records and modifications -->
            <v-col>
                <v-card class="rounded" min-height="360" elevation="6">
                    <v-card-title class="blue-grey darken-3 white--text">Últimos Registros ou Modificações</v-card-title>
                    <div>
                        <v-list>
                            <!-- Editora -->
                            <v-list-group color="blue-grey" prepend-icon="mdi-office-building">
                                <template v-slot:activator>
                                    <v-list-item-title>Editora</v-list-item-title>
                                </template>
                                <v-list-item link v-for="(value, name, i) in lastEditora" :key="i">
                                    <v-list-item-content>
                                        <b>{{ formatName(name) }}</b> {{ value }}
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-group>
                            <!-- Usuário -->
                            <v-list-group color="blue-grey" prepend-icon="mdi-account-multiple">
                                <template v-slot:activator>
                                    <v-list-item-title>Usuário</v-list-item-title>
                                </template>
                                <v-list-item link v-for="(value, name, i) in lastUsuario" :key="i">
                                    <v-list-item-content>
                                        <b>{{ formatName(name) }}</b> {{ value }}
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-group>
                            <!-- Livro -->
                            <v-list-group color="blue-grey" prepend-icon="mdi-book-multiple">
                                <template v-slot:activator>
                                    <v-list-item-title>Livro</v-list-item-title>
                                </template>
                                <v-list-item link v-for="(valueLastLivro, nameLastLivro, i) in lastLivro" :key="i">
                                    <v-list-item-content v-if="!(typeof valueLastLivro === 'object')">
                                        <b>{{ formatName(nameLastLivro) }}</b> {{ valueLastLivro }}
                                    </v-list-item-content>
                                    <v-list-item-content v-else>
                                        <b>{{ formatName(nameLastLivro) }}</b>
                                    </v-list-item-content>
                                    <!-- Editora in Livro -->
                                    <v-list-group v-if="typeof valueLastLivro === 'object'" color="blue-grey" sub-group>
                                        <v-list-item link v-for="(valueEditora, nameEditora, i) in valueLastLivro" :key="i">
                                            <v-list-item-content>
                                                <b>{{ formatName(nameEditora) }}</b> {{ valueEditora }}
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-group>
                                </v-list-item>
                            </v-list-group>
                            <!-- Aluguel -->
                            <v-list-group color="blue-grey" prepend-icon="mdi-calendar-multiple">
                                <template v-slot:activator>
                                    <v-list-item-title>Aluguel</v-list-item-title>
                                </template>
                                <v-list-item link v-for="(valueLastAluguel, nameLastAluguel, i) in lastAluguel" :key="i">
                                    <v-list-item-content v-if="!(typeof valueLastAluguel === 'object')">
                                        <b>{{ formatName(nameLastAluguel) }}</b
                                        >{{ valueLastAluguel }}
                                    </v-list-item-content>
                                    <v-list-item-content v-else>
                                        <b>{{ formatName(nameLastAluguel) }}</b>
                                    </v-list-item-content>
                                    <!-- Livro or Usuario in Aluguel -->
                                    <v-list-group
                                        v-if="typeof valueLastAluguel === 'object' && valueLastAluguel !== null"
                                        color="blue-grey"
                                        sub-group
                                    >
                                        <v-list-item link v-for="(valueEntity, nameEntity, i) in valueLastAluguel" :key="i">
                                            <v-list-item-content v-if="!(typeof valueEntity === 'object')">
                                                <b>{{ formatName(nameEntity) }}</b> {{ valueEntity }}
                                            </v-list-item-content>
                                            <v-list-item-content v-else>
                                                <b>{{ formatName(nameEntity) }}</b>
                                            </v-list-item-content>
                                            <!-- Editora in Livro in Aluguel -->
                                            <v-list-group v-if="typeof valueEntity === 'object'" color="blue-grey" sub-group>
                                                <v-list-item link v-for="(valueEditora, nameEditora, i) in valueEntity" :key="i">
                                                    <v-list-item-content v-if="typeof valueEntity === 'object'">
                                                        <b>{{ formatName(nameEditora) }}</b>
                                                        {{ valueEditora }}
                                                    </v-list-item-content>
                                                    <v-list-item-content v-else>
                                                        <b>{{ formatName(nameEditora) }}</b>
                                                    </v-list-item-content>
                                                </v-list-item>
                                            </v-list-group>
                                        </v-list-item>
                                    </v-list-group>
                                </v-list-item>
                            </v-list-group>
                        </v-list>
                    </div>
                </v-card>
            </v-col>
        </v-row>
        <!-- Total entities -->
        <v-row>
            <v-col>
                <v-card min-width="200">
                    <v-card-title class="blue-grey darken-3 white--text">Total Editoras: {{ arraysLength[0] }} </v-card-title>
                </v-card>
            </v-col>
            <v-col>
                <v-card min-width="200">
                    <v-card-title class="blue-grey darken-3 white--text">Total Livros: {{ arraysLength[2] }} </v-card-title>
                </v-card>
            </v-col>
            <v-col>
                <v-card min-width="200">
                    <v-card-title class="blue-grey darken-3 white--text">Total Usuários: {{ arraysLength[1] }} </v-card-title>
                </v-card>
            </v-col>
            <v-col>
                <v-card min-width="200">
                    <v-card-title class="blue-grey darken-3 white--text">Total Alugueis: {{ arraysLength[3] }}</v-card-title>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import aluguelService from '../service/AluguelService';
import editoraService from '../service/EditoraService';
import usuarioService from '../service/UsuarioService';
import livroService from '../service/LivroService';
import moment from 'moment';

export default {
    data: () => ({
        series: [
            {
                data: [0, 0, 0],
            },
        ],

        chartOptions: {
            chart: {
                width: 380,
                type: 'bar',
                toolbar: {
                    show: false,
                },
            },

            colors: ['#FF9800', '#F44336', '#4CAF50'],

            labels: ['Pendente', 'Atrasado', 'No prazo'],

            tooltip: {
                enabled: true,
                fillSeriesCollor: true,
                theme: 'dark',
            },

            plotOptions: {
                bar: {
                    columnWidth: '45%',
                    distributed: true,
                },
            },

            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 300,
                        },
                        legend: {
                            position: 'bottom',
                        },
                    },
                },
            ],
        },
        alugueis: [],
        show: true,
        lastAluguel: {},
        lastEditora: {},
        lastLivro: {},
        lastUsuario: {},
        lastShow: true,
        arraysLength: [],
    }),

    created() {
        this.initialize();
    },

    methods: {
        initialize() {
            aluguelService.findAllNotPaged().then(res => {
                this.alugueis = res.data;
                this.show = !this.show;
                this.setSeries(this.alugueis);
            });
            this.setLastEditora();
            this.setLastUsuario();
            this.setLastLivro();
            this.setLastAluguel();
        },

        setSeries(alugueis) {
            alugueis.forEach(aluguel => {
                if (moment(aluguel.dataDevolucao, 'DD-MM-YYYY').isSameOrBefore(moment(aluguel.dataPrevisao, 'DD-MM-YYYY'))) {
                    this.series[0].data[2]++;
                } else if (moment(aluguel.dataDevolucao, 'DD-MM-YYYY').isAfter(moment(aluguel.dataPrevisao, 'DD-MM-YYYY'))) {
                    this.series[0].data[1]++;
                } else {
                    this.series[0].data[0]++;
                }
            });
        },

        setLastEditora() {
            editoraService.findAllNotPaged().then(res => {
                this.lastEditora = res.data[res.data.length - 1];
                this.arraysLength[0] = res.data.length;
            });
        },

        setLastUsuario() {
            usuarioService.findAllNotPaged().then(res => {
                this.lastUsuario = res.data[res.data.length - 1];
                this.arraysLength[1] = res.data.length;
            });
        },

        setLastLivro() {
            livroService.findAllNotPaged().then(res => {
                this.lastLivro = res.data[res.data.length - 1];
                this.arraysLength[2] = res.data.length;
            });
        },

        setLastAluguel() {
            aluguelService.findAllNotPaged().then(res => {
                this.lastAluguel = res.data[res.data.length - 1];
                this.arraysLength[3] = res.data.length;
            });
        },

        formatName(name) {
            return name.charAt(0).toUpperCase() + name.slice(1);
        },
    },
};
</script>
