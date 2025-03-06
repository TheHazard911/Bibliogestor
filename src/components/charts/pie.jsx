import React from 'react'
import { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

function Pie() {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        // Crear el gráfico
        const myChart = new Chart(ctx, {
            type: 'pie', // Cambia esto al tipo de gráfico que desees
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
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        // Limpiar el gráfico al desmontar el componente
        return () => {
            myChart.destroy();
        };
    }, []);

    return <canvas ref={chartRef} className='chart-pie'/>;
}

export default Pie
