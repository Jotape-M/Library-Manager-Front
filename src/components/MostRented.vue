<template>
    <div id="chart">
        <apexchart v-if="!show" type="bar" height="295" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>

<script>
import aluguelService from '../service/AluguelService';
import livroService from '../service/LivroService';

export default {
    name: 'MostRented',

    data: () => ({
        series: [
            {
                data: [0, 0, 0, 0, 0],
            },
        ],
        chartOptions: {
            chart: {
                width: 380,
                toolbar: {
                    show: false,
                },
            },
            colors: ['#FF9800', '#F44336', '#4CAF50'],
            labels: [''],
            tooltip: {
                enabled: true,
                fillSeriesCollor: true,
                theme: 'dark',
            },
            plotOptions: {
                bar: {
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

            legend: {
                show: false,
            },
        },

        show: true,
    }),

    created() {
        this.initialize();
    },

    methods: {
        initialize() {
            aluguelService.findAllNotPaged().then(res => {
                this.livroMaisAlugado(res.data);
            });
        },

        livroMaisAlugado(alugueis) {
            livroService.findAllNotPaged().then(res => {
                let cont = 0;
                let freq = [];
                res.data.forEach(livro => {
                    alugueis.forEach(aluguel => {
                        if (livro.id == aluguel.livro.id) {
                            cont++;
                        }
                    });
                    freq.push([livro.nome, cont]);
                    cont = 0;
                });
                let mostRented = freq
                    .sort((a, b) => {
                        return b[1] - a[1];
                    })
                    .slice(0, 5);
                for (let i = 0; i < 5; i++) {
                    this.series[0].data[i] += mostRented[i][1];
                    this.chartOptions.labels[i] = mostRented[i][0];
                }
                this.show = !this.show;
            });
        },
    },
};
</script>
