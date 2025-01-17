import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import React from 'react'
import { Typography } from '@mui/material';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false, // Ensure the chart uses the full size of the container
  plugins: {
    legend: {
      // position: 'top',
      display: false
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          return `Economic Status Wise: ${tooltipItem.raw}`;
        },
      },
    },
    // title: {
    //   display: true,
    //   text: 'Monthly Sales Data',
    // },
  },
  animation: {
    duration: 1000, // Animation duration in milliseconds
    easing: 'easeOutBounce', // Animation easing
  },
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        display: false, // Remove vertical grid lines
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false, // Remove vertical grid lines
      },
      // ticks: {
      //   callback: function(value) {
      //     // Format y-axis ticks to integer
      //     return Number(value).toFixed(0);
      //   },
      // },

    },
  },
};


const Chart5 = ({dashboardCountData}) => {
  const Chartdata = {
    labels: ['A.P.L', 'B.P.L'],
    datasets: [
      {
        label: 'Sales',
        data: [dashboardCountData?.economic_aplCount, dashboardCountData?.economic_bplCount],
        backgroundColor: [
          '#22CFCF',
          '#FF6384',
          '#059BFF',

        ],
        // borderColor: '',
        borderWidth: 0,
      },
    ],
  };
  return (<>
  <Typography color={"#858796"} fontSize={16} mb={2}>Economic Status Wise</Typography>
    <div style={{ width : "100%", height: "200px"}}>
                <Bar data={Chartdata} options={options} />
                </div>
                </>
  )
}

export default Chart5
