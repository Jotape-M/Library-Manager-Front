<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card class="rounded" elevation="6">
                    <v-card-title class="blue-grey darken-3 white--text">Status dos Alugueis</v-card-title>
                    <div id="chart">
                        <apexchart v-if="!show" type="bar" width="450" :options="chartOptions" :series="series"></apexchart>
                    </div>
                </v-card>
            </v-col>
            <v-col>
                <v-card class="rounded" min-height="360" elevation="6">
                    <v-card-title class="blue-grey darken-3 white--text">Últimos Registros</v-card-title>
                    <div>
                        <v-list>
                            <v-list-group color="blue-grey" prepend-icon="mdi-office-building">
                                <template v-slot:activator>
                                    <v-list-item-title>Editora</v-list-item-title>
                                </template>
                                <v-list-item link v-for="(value, name, i) in lastEditora" :key="i">
                                    <v-list-item-content>
                                        <b>{{ name.charAt(0).toUpperCase() + name.slice(1) }}</b> {{ value }}
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group color="blue-grey" prepend-icon="mdi-account-multiple">
                                <template v-slot:activator>
                                    <v-list-item-title>Usuário</v-list-item-title>
                                </template>
                                <v-list-item link v-for="(value, name, i) in lastUsuario" :key="i">
                                    <v-list-item-content>
                                        <b>{{ name.charAt(0).toUpperCase() + name.slice(1) }}</b> {{ value }}
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group color="blue-grey" prepend-icon="mdi-book-multiple">
                                <template v-slot:activator>
                                    <v-list-item-title>Livro</v-list-item-title>
                                </template>
                                <v-list-item link v-for="(value, name, i) in lastLivro" :key="i">
                                    <v-list-item-content v-if="!(typeof value === 'object')">
                                        <b>{{ name.charAt(0).toUpperCase() + name.slice(1) }}</b> {{ value }}
                                    </v-list-item-content>
                                    <v-list-item-content v-else>
                                        <b>{{ name.charAt(0).toUpperCase() + name.slice(1) }}</b>
                                    </v-list-item-content>
                                    <v-list-group v-if="typeof value === 'object'" color="blue-grey" sub-group>
                                        <v-list-item link v-for="(val, nome, i) in value" :key="i">
                                            <v-list-item-content>
                                                <b>{{ nome.charAt(0).toUpperCase() + nome.slice(1) }}</b> {{ val }}
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-group>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group color="blue-grey" prepend-icon="mdi-calendar-multiple">
                                <template v-slot:activator>
                                    <v-list-item-title>Aluguel</v-list-item-title>
                                </template>
                                <v-list-item link v-for="(value, name, i) in lastAluguel" :key="i">
                                    <v-list-item-content v-if="!(typeof value === 'object')">
                                        <b>{{ name.charAt(0).toUpperCase() + name.slice(1) }}</b> {{ value }}
                                    </v-list-item-content>
                                    <v-list-item-content v-else>
                                        <b>{{ name.charAt(0).toUpperCase() + name.slice(1) }}</b>
                                    </v-list-item-content>

                                    <v-list-group v-if="typeof value === 'object'" color="blue-grey" sub-group>
                                        <v-list-item link v-for="(val, nome, i) in value" :key="i">
                                            <v-list-item-content v-if="!(typeof val === 'object')">
                                                <b>{{ nome.charAt(0).toUpperCase() + nome.slice(1) }}</b> {{ val }}
                                            </v-list-item-content>
                                            <v-list-item-content v-else>
                                                <b>{{ nome.charAt(0).toUpperCase() + nome.slice(1) }}</b>
                                            </v-list-item-content>

                                            <v-list-group v-if="typeof val === 'object'" color="blue-grey" sub-group>
                                                <v-list-item link v-for="(v, n, i) in val" :key="i">
                                                    <v-list-item-content v-if="typeof val === 'object'">
                                                        <b>{{ n.charAt(0).toUpperCase() + n.slice(1) }}</b> {{ v }}
                                                    </v-list-item-content>
                                                    <v-list-item-content v-else>
                                                        <b>{{ n.charAt(0).toUpperCase() + n.slice(1) }}</b>
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
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="blue-grey darken-3 white--text">Editora</v-card-title>
                    <div></div>
                </v-card>
            </v-col>
            <v-col>
                <v-card>
                    <v-card-title class="blue-grey darken-3 white--text">Livro</v-card-title>
                    <div></div>
                </v-card>
            </v-col>
            <v-col>
                <v-card>
                    <v-card-title class="blue-grey darken-3 white--text">Usuário</v-card-title>
                    <div></div>
                </v-card>
            </v-col>
            <v-col>
                <v-card>
                    <v-card-title class="blue-grey darken-3 white--text">Aluguel</v-card-title>
                    <div></div>
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
                if (aluguel.dataDevolucao <= aluguel.dataPrevisao) {
                    this.series[0].data[2]++;
                } else if (aluguel.dataDevolucao > aluguel.dataPrevisao) {
                    this.series[0].data[1]++;
                } else {
                    this.series[0].data[0]++;
                }
            });
        },

        setLastEditora() {
            editoraService.findAllNotPaged().then(res => {
                this.lastEditora = res.data[res.data.length - 1];
            });
        },

        setLastUsuario() {
            usuarioService.findAllNotPaged().then(res => {
                this.lastUsuario = res.data[res.data.length - 1];
            });
        },

        setLastLivro() {
            livroService.findAllNotPaged().then(res => {
                this.lastLivro = res.data[res.data.length - 1];
            });
        },

        setLastAluguel() {
            aluguelService.findAllNotPaged().then(res => {
                this.lastAluguel = res.data[res.data.length - 1];
            });
        },
    },
};
</script>
