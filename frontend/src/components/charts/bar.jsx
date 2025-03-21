import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

function Bar() {
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
                        data: [12, 19, 10],
                        backgroundColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
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
                                size: 18,
                            },
                        },
                    },
                    datalabels: {
                        color: 'white',
                        font: {
                            size: 22,
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

export default Bar;
