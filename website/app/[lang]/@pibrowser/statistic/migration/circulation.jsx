'use client'
import Chart from 'chart.js/auto';
import 'chartjs-adapter-luxon';
import {  Line } from "react-chartjs-2"

export default function Circulation({data,transcript}){
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
        label: "Liquidity",
        data: data,
        fill: true,
        borderColor: 'rgb(255, 165, 0)',
        backgroundColor: 'rgba(255,165,0,0.5)',
        yAxisID: 'y',
        parsing: {
          xAxisKey: 'x',
          yAxisKey: "b",
        },
      },
      {
        label: "Lock",
        data: data,
        fill: true,
        borderColor: 'rgb(102 ,69, 211)',
        backgroundColor: 'rgba(102,69,211, 0.5)',
        yAxisID: 'y',
        parsing: {
          xAxisKey: 'x',
          yAxisKey: "c",
        },
      }
    ],
  }

    return(
        <>
        <div className="text-center my-2 font-bold text-lg bg-border bg-border-size bg-no-repeat bg-left-bottom ">
        Liquidity
        </div>
        
        <div className="h-48">
        <Line options={option} data={dataset} />
        </div>
        </>
    )
}