import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default function Bar_2() {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        const myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Prestados', 'Totales', 'Disponibles'],
                datasets: [
                    {
                        label: 'Estado de Libros',
                        data: [10, 20, 50],
                        backgroundColor: [
                            'rgb(255, 0, 55)',
                            'rgb(255, 238, 0)',
                            'rgb(69, 0, 180)',
                        ],
                        borderColor: [
                           'rgb(255, 0, 55)',
                            'rgb(255, 238, 0)',
                            'rgb(69, 0, 180)',
                        ],
                        borderWidth: 2,
                    },
                ],
            },
            options: {
                plugins: {
                    legend: {
                        labels: {
                            color: 'black',
                            font: {
                                size: 16,
                            },
                        },
                    },
                    datalabels: {
                        color: 'white',
                        font: {
                            size: 16,
                        },
                        anchor: 'center',
                        align: 'center',
                    },
                },
            },
            plugins: [ChartDataLabels]
        });

        return () => {
            myChart.destroy();
        };
    }, []);

    return <canvas ref={chartRef} className='chart-pie' />;
}

