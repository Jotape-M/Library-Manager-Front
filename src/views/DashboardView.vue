<template>
    <v-container>
        <v-row>
            <!-- Graphics -->
            <v-col>
                <v-card class="rounded" elevation="6">
                    <v-card-title class="blue-grey darken-3 white--text">Status dos Alugueis</v-card-title>
                    <div id="chart">
                        <apexchart
                            v-if="!show"
                            type="radialBar"
                            width="450"
                            height="350"
                            :options="chartOptions"
                            :series="series"
                        ></apexchart>
                    </div>
                </v-card>
            </v-col>
            <!-- Latest records and modifications -->
            <v-col>
                <v-card class="rounded" min-height="360" elevation="6">
                    <v-card-title class="blue-grey darken-3 white--text">Livros mais alugados</v-card-title>
                    <div>
                        <app-most-rented />
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

import MostRented from '../components/MostRented.vue';

export default {
    components: {
        'app-most-rented': MostRented,
    },

    data: () => ({
        series: [0, 0, 0],

        chartOptions: {
            chart: {
                width: 380,
                type: 'radialBar',
                toolbar: {
                    show: false,
                },
            },

            colors: ['#FF9800', '#F44336', '#4CAF50'],

            labels: ['Pendente', 'Atrasado', 'No prazo'],

            legend: {
                show: true,
            },

            tooltip: {
                enabled: true,
                fillSeriesCollor: true,
                theme: 'dark',
            },

            plotOptions: {
                radialBar: {
                    dataLabels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '22px',
                        },
                        value: {
                            show: true,
                            fontSize: '16px',
                            formatter: val => {
                                return parseInt(val);
                            },
                        },
                        total: {
                            show: true,
                            corlor: '#373d3f',
                            label: 'Total',
                            formatter: w => {
                                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                                return w.globals.series[0] + w.globals.series[1] + w.globals.series[2];
                            },
                        },
                    },
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
                this.setSeries(this.alugueis);
                this.arraysLength[3] = res.data.length;
                this.show = !this.show;
            });
            this.setLastEditora();
            this.setLastUsuario();
            this.setLastLivro();
            this.setLastAluguel();
        },

        setSeries(alugueis) {
            alugueis.forEach(aluguel => {
                if (moment(aluguel.dataDevolucao, 'DD-MM-YYYY').isSameOrBefore(moment(aluguel.dataPrevisao, 'DD-MM-YYYY'))) {
                    this.series[2]++;
                } else if (moment(aluguel.dataDevolucao, 'DD-MM-YYYY').isAfter(moment(aluguel.dataPrevisao, 'DD-MM-YYYY'))) {
                    this.series[1]++;
                } else {
                    this.series[0]++;
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
