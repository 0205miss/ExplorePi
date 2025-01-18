'use client'

import { useEffect, useState } from "react"
import Chart from 'chart.js/auto';
import 'chartjs-adapter-luxon';
import { Bar } from "react-chartjs-2"

export default function OnChainLockUP({data,transcript}){
    if(!data) return
    const [option,setoption] = useState(null)
    const [range,setrange] = useState('all')
    const [datas,setdatas] = useState(null)
    useEffect(()=>{
      if(!range) return
      if(range==='all')
      {
        setoption({
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
              },
              z: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                  drawOnChartArea: false,
                },
              },
            },
          })
        setdatas(
            {
                datasets: [
                  {
                    type:'line',
                    label: "Unlock Amount",
                    data: data.OnChainclaimedMonth,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    yAxisID: 'z',
                    parsing: {
                      yAxisKey: 'z'
                    }
                  },
                  {
                    type:'line',
                    label: "lock Amount",
                    data: data.OnChaincreateclaimantMonth,
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    yAxisID: 'z',
                    parsing: {
                      yAxisKey: 'z'
                    }
                  },
                  {
                    type:'bar',
                    label: transcript.Unlock,
                    data: data.OnChainclaimedMonth,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    yAxisID: 'y',
                  },
                  {
                    label: transcript.lock,
                    data: data.OnChaincreateclaimantMonth,
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    yAxisID: 'y',
                  },
                ],
              }
        )
      }
      
      else if(range==='m')
      {
        setoption({
            maintainAspectRatio : false,
            interaction: {
              mode: 'x',
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
                    min: Date.now()-2629800000,
                    max: Date.now()
                },
              y: {
                type: 'linear',
                display: true,
                position: 'left',
                grid: {
                    drawOnChartArea: false,
                  },
              },
              z: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                  drawOnChartArea: false,
                },
              },
            },
          })
        setdatas(
            {
                datasets: [
                  {
                    type:'line',
                    label: "Unlock Amount",
                    data: data.OnChainclaimed,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    yAxisID: 'z',
                    parsing: {
                      yAxisKey: 'z'
                    }
                  },
                  {
                    type:'line',
                    label: "lock Amount",
                    data: data.OnChaincreateclaimant,
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    yAxisID: 'z',
                    parsing: {
                      yAxisKey: 'z'
                    }
                  },
                  {
                    label: transcript.Unlock,
                    data: data.OnChainclaimed,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    yAxisID: 'y',
                  },
                  {
                    label: transcript.lock,
                    data: data.OnChaincreateclaimant,
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    yAxisID: 'y',
                  }
                ],
              }
        )
      }
      else if(range==='y')
      {
        setoption({
            maintainAspectRatio : false,
            interaction: {
              mode: 'x',
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
                    min: Date.now()-31556952000,
                    max: Date.now(),
                    time:{
                      tooltipFormat:'yyyy-LL',
                      unit: 'month'
                    }
                },
              y: {
                type: 'linear',
                display: true,
                position: 'left',
              },
              z: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                  drawOnChartArea: false,
                },
              },
            },
          })
        setdatas(
            {
                datasets: [
                  {
                    type:'line',
                    label: "Unlock Amount",
                    data: data.OnChainclaimedMonth,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    yAxisID: 'z',
                    parsing: {
                      yAxisKey: 'z'
                    }
                  },
                  {
                    type:'line',
                    label: "lock Amount",
                    data: data.OnChaincreateclaimantMonth,
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    yAxisID: 'z',
                    parsing: {
                      yAxisKey: 'z'
                    }
                  },
                  {
                    label: transcript.Unlock,
                    data: data.OnChainclaimedMonth,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    yAxisID: 'y',
                  },
                  {
                    label: transcript.lock,
                    data: data.OnChaincreateclaimantMonth,
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    yAxisID: 'y',
                  },
                ],
              }
        )
      }
    },[data,range])
    return(
        <>
        <div className="text-center my-2 font-bold text-lg bg-border bg-border-size bg-no-repeat bg-left-bottom ">
            On Chain LockUp
        </div>
        <div className="flex items-center justify-center mb-3">
            <div className="inline-flex shadow-md hover:shadow-lg focus:shadow-lg" role="group">
                <button type="button" className="rounded-l inline-block px-6 py-2.5 bg-yellow-400 text-white font-medium text-xs leading-tight uppercase hover:bg-yellow-600 focus:bg-yellow-600 focus:outline-none focus:ring-0 active:bg-yellow-700 transition duration-150 ease-in-out" onClick={()=>setrange('m')}>{transcript.Month}</button>
                <button type="button" className="inline-block px-6 py-2.5 bg-yellow-400 text-white font-medium text-xs leading-tight uppercase hover:bg-yellow-600 focus:bg-yellow-600 focus:outline-none focus:ring-0 active:bg-yellow-700 transition duration-150 ease-in-out" onClick={()=>setrange('y')}>{transcript.Year}</button>
                <button type="button" className="rounded-r inline-block px-6 py-2.5 bg-yellow-400 text-white font-medium text-xs leading-tight uppercase hover:bg-yellow-600 focus:bg-yellow-600 focus:outline-none focus:ring-0 active:bg-yellow-700 transition duration-150 ease-in-out" onClick={()=>setrange('all')}>{transcript.ALL}</button>
            </div>
        </div>
        <div className="h-48">
        {datas && <Bar options={option} data={datas} />}
        </div>
        </>
    )
}