<template>
    <v-card>
        <div id="chart">
            <apexchart type="pie" width="380" :options="chartOptions" :series="series"></apexchart>
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
                            width: 200,
                        },
                        legend: {
                            position: 'bottom',
                        },
                    },
                },
            ],
        },
        alugueis: [],
    }),

    created() {
        this.initialize();
    },

    methods: {
        initialize() {
            aluguelService.findAll().then(res => {
                console.log(res.data);
                const { totalElements, content } = res.data;
                console.log(content);
                this.alugueis = content;
                this.totalAlugueis = totalElements;
                this.setSeries(content);
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
