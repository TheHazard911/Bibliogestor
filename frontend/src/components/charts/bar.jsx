import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

function Bar() {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);
  let myChart = null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/estadisticas"
        );
        if (!response.ok) throw new Error("Error al obtener datos");
        const data = await response.json();

        // Actualizar el estado con los datos obtenidos
        setChartData({
          labels: ["Prestados", "Totales", "Disponibles"],
          datasets: [
            {
              label: "Estado de Libros",
              data: [
                data.librosPrestados,
                data.totalLibros,
                data.librosDisponibles,
              ],
              backgroundColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
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
                font: { size: 18 },
              },
            },
            datalabels: {
              color: "white",
              font: { size: 22 },
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

export default Bar;
