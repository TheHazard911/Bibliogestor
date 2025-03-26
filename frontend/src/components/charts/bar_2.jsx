import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

export default function UserChart() {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);
  let myChart = null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/usuarios_estadisticas",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) throw new Error("Error al obtener datos");

        const data = await response.json();

        setChartData({
          labels: [
            "Usuarios Bloqueados",
            "Administradores",
            "Usuarios Activos",
          ],
          datasets: [
            {
              label: "Estado de Usuarios",
              data: [data.bloqueados, data.administradores, data.activos],
              backgroundColor: [
                "rgb(255, 0, 55)", // Rojo - Bloqueados
                "rgb(0, 128, 255)", // Azul - Administradores
                "rgb(0, 200, 80)", // Verde - Activos
              ],
              borderColor: [
                "rgb(255, 0, 55)",
                "rgb(0, 128, 255)",
                "rgb(0, 200, 80)",
              ],
              borderWidth: 2,
            },
          ],
        });
      } catch (error) {
        console.error("❌ Error al obtener datos de la gráfica:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartData && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (myChart) myChart.destroy(); // Destruir gráfico anterior para evitar duplicados

      myChart = new Chart(ctx, {
        type: "pie",
        data: chartData,
        options: {
          plugins: {
            legend: {
              labels: {
                color: "black",
                font: { size: 16 },
              },
            },
            datalabels: {
              color: "white",
              font: { size: 16 },
              anchor: "center",
              align: "center",
            },
          },
        },
        plugins: [ChartDataLabels],
      });

      return () => myChart.destroy(); // Cleanup al desmontar el componente
    }
  }, [chartData]);

  return <canvas ref={chartRef} className="chart-pie" />;
}
