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
          return `Social Category Wise: ${tooltipItem.raw}`;
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
    },
  },
};


const Chart4 = ({ dashboardCountData }) => {

  const Chartdata = {
    labels: ['Scheduled Caste', 'Scheduled Tribes', 'Minority', 'OBC', 'General'],
    datasets: [
      {
        label: 'Sales',
        data: [dashboardCountData?.social_SCCount, dashboardCountData?.social_STCount, dashboardCountData?.social_MinorityCount, dashboardCountData?.social_OBCCount,  dashboardCountData?.social_GeneralCount],
        backgroundColor: [
          '#22CFCF',
          '#FF6384',
          '#059BFF',
          '#FFCE56',
          '#9966FF',
          '#FF9E3F',

        ],
        // borderColor: '',
        borderWidth: 0,
      },
    ],
  };
  return (<>
    <Typography color={"#858796"} fontSize={16} mb={2}>Social Category Wise</Typography>
    <div style={{ width: "100%", height: "200px" }}>
      <Bar data={Chartdata} options={options} />
    </div>
  </>
  )
}

export default Chart4
