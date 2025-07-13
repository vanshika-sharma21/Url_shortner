import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
/*
CategoryScale : Used for the x-axis (dates, categories).
LinearScale : Used for the y-axis (numerical values).
PointElement  : Draws the points (dots) on the line.
LineElement : Draws the actual line.
Title : Allows chart titles.
Tooltip : Shows hover info.
Legend  : Displays labels for each line (e.g., "Clicks").
*/

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
/*
This tells Chart.js: "Hey, I want to use these features in my chart."
It's like enabling plugins/extensions before using them.
*/

const DailyClicksChart = ({ data }) => {//it takes in data as a prop — an array of objects with date and count.
  const chartData = {
    labels: data.map(item => item.date),//Creates an array of labels for the x-axis using the date from each data object.
    datasets: [
      {
        label: 'Clicks',
        data: data.map(item => item.count),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.1,
      },
    ],
  };
  /*
datasets  : Array of data lines to draw on the chart. Here, there’s just one — for clicks.
label : This appears in the chart legend ("Clicks").
data  : The actual click numbers (like [3, 5, 8, 2]).
borderColor : Line color (blue).
backgroundColor : Area under the line (light blue shade).
tension : Controls curve of the line (0.1 = slightly curved).
  */

  const options = {//Makes the chart adjust to screen size (mobile-friendly).
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,//Always starts from 0 (important for showing small numbers).
        ticks: {
          stepSize: 1,//Y-axis will go up in steps of 1 (0, 1, 2, 3...).
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
  //Passes chartData and options to the Line component to draw it.
};

export default DailyClicksChart;
/*
Labels on the x-axis (dates),
Click numbers on the y-axis,
A blue line showing how clicks change day to day,
Hover tooltips, a legend, and responsive design.
*/