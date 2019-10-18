import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import HealthContext from '../context/DetailsContext';

const LatencyChart = (props) => {
    
    // for (let i = 0; i < healthData.length; i += 1) {
    //     // If Mongo
    //     if (healthData[i].currentMicroservice === props.service) {
    //       memoryObj.free += healthData[i].freeMemory;
    //       memoryObj.active += healthData[i].activeMemory;
    //       memoryObj.used += healthData[i].usedMemory;
    //       memoryObj.total += healthData[i].totalMemory;
    //     }
  
    //     // If SQL
    //     if (healthData[i].currentmicroservice === props.service) {
    //       memoryObj.free += healthData[i].freememory;
    //       memoryObj.active += healthData[i].activememory;
    //       memoryObj.used += healthData[i].usedmemory;
    //       memoryObj.total += healthData[i].totalmemory;
    //     }
    //   }


    const xAxis = []
    const yAxis = [];
    const healthData = useContext(HealthContext).detailData;
    for (let i = 0; i < healthData.length; i++){
        if (healthData[i].latency !== null){
            xAxis.push(i);
            yAxis.push(healthData[i].latency);
        }
    }
    const chartData = {
        datasets: [{
        label: `CPU latency of ${props.service}`,
        data: yAxis,
        backgroundColor: [
            'rgb(254, 255, 0)']}]
        ,
        options: {
            xAxisID: 'TBD',
            yAxisID: 'TBD'
        },
        labels: xAxis
    }
    return (
        <div>
            <Line data ={chartData} />
        </div>
    )



}

export default LatencyChart;
