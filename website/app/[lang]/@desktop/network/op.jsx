'use client'
import { useEffect, useState } from "react"
import Chart from 'chart.js/auto';
import 'chartjs-adapter-luxon';
import { Line } from "react-chartjs-2"

  export const options = {
    maintainAspectRatio : false,
    interaction: {
      mode: 'index',
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
            type: 'time'
        },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      }
    },
  };

export default function TotalOperation({data,transcript}){
    if(!data) return
    const [filter,setfilter] = useState([])
    const [range,setrange] = useState('all')
    const [datas,setdatas] = useState(null)
    useEffect(()=>{
      if(!range) return
      if(range==='all')
      setfilter(data.blockMonth)
      else if(range==='m')
      setfilter(data.block.slice(1,30))
      else if(range==='y')
      setfilter(data.blockMonth.slice(-12))
    },[data,range])

    useEffect(()=>{
        if(!filter) return
        setdatas(
            {
                datasets: [
                  {
                    label: 'Operation',
                    data: filter,
                    borderColor: 'rgb(244, 190, 95)',
                    backgroundColor: 'rgba(244, 190, 95, 0.5)',
                    yAxisID: 'y',
                    spanGaps: true,
                    parsing: {
                      yAxisKey: 'op'
                    }
                  },
                ],
              }
        )
    },[filter])
    
    return(
        <>
        <div className="text-center mb-2 font-bold text-lg bg-border bg-border-size bg-no-repeat bg-left-bottom ">
            Total Operation
        </div>
        <div className="flex items-center justify-center mb-3">
            <div className="inline-flex shadow-md hover:shadow-lg focus:shadow-lg" role="group">
                <button type="button" className="rounded-l inline-block px-6 py-2.5 bg-yellow-400 text-white font-medium text-xs leading-tight uppercase hover:bg-yellow-600 focus:bg-yellow-600 focus:outline-none focus:ring-0 active:bg-yellow-700 transition duration-150 ease-in-out" onClick={()=>setrange('m')}>{transcript.Month}</button>
                <button type="button" className="inline-block px-6 py-2.5 bg-yellow-400 text-white font-medium text-xs leading-tight uppercase hover:bg-yellow-600 focus:bg-yellow-600 focus:outline-none focus:ring-0 active:bg-yellow-700 transition duration-150 ease-in-out" onClick={()=>setrange('y')}>{transcript.Year}</button>
                <button type="button" className="rounded-r inline-block px-6 py-2.5 bg-yellow-400 text-white font-medium text-xs leading-tight uppercase hover:bg-yellow-600 focus:bg-yellow-600 focus:outline-none focus:ring-0 active:bg-yellow-700 transition duration-150 ease-in-out" onClick={()=>setrange('all')}>{transcript.ALL}</button>
            </div>
        </div>
        <div className="h-48">
          {datas && <Line options={options} data={datas} />}
        </div>
        </>
    )
}