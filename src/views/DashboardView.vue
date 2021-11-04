<template>
    <v-card>
        <v-card-title>Status dos alugueis</v-card-title>
        <div id="chart">
            <apexchart v-show="show" type="pie" width="400" :options="chartOptions" :series="series"></apexchart>
        </div>
    </v-card>
</template>

<script>
import aluguelService from '../service/AluguelService';

export default {
    data: () => ({
        series: [0, 0, 0],
        chartOptions: {
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: ['Pendente', 'Atrasado', 'No prazo'],
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
        show: false,
    }),

    mounted() {
        this.initialize();
    },

    methods: {
        initialize() {
            aluguelService.findAll().then(res => {
                const { totalElements, content } = res.data;
                this.alugueis = content;
                this.totalAlugueis = totalElements;
                this.setSeries(content);
                this.show = !this.show;
            });
        },

        setSeries(alugueis) {
            alugueis.forEach(aluguel => {
                if (aluguel.dataDevolucao <= aluguel.dataPrevisao) {
                    this.series[2]++;
                }

                if (!aluguel.dataDevolucao) {
                    this.series[0]++;
                }

                if (aluguel.dataDevolucao > aluguel.dataPrevisao) {
                    this.series[1]++;
                }
            });
        },
    },
};
</script>
