'use client'
import Chart from 'chart.js/auto';
import 'chartjs-adapter-luxon';
import {  Line } from "react-chartjs-2"

export default function AccountCreation({data,transcript}){
  if(!data) return

  const option = {
    maintainAspectRatio : false,
    interaction: {
      mode: 'nearest',
      axis:'x',
      intersect: false,
    },
    stacked: false,
    elements:{
        point:{
            radius:1,
        }
    },
    scales: {
        x: {
            type: 'time',
            time:{
              tooltipFormat:'yyyy-LL',
              unit: 'month'
            }
        },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      }
    },
  }

  const dataset = {
    datasets: [
      {
        label: "Pioneer Amount",
        data: data.accountCreation,
        fill: true,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255,165,0, 0.5)',
        yAxisID: 'y',
      }
    ],
  }

    return(
        <>
        <div className="text-center my-2 font-bold text-lg bg-border bg-border-size bg-no-repeat bg-left-bottom ">
            Pioneer Account
        </div>
        
        <div className="h-48">
        <Line options={option} data={dataset} />
        </div>
        </>
    )
}