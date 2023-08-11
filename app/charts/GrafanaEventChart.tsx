import React, { useState } from 'react';
import { all, solo as soloStyle } from './sizeSwitch';

interface EventChartProps {
    metricName: string;
}

// interface SoloStyles {
//     height: number;
//     width: number;
// }



/** 
 * @params {EventChartProps} props - the props object containing relevant data.
 * @desc Handles k8s metrics. Memoized component to generate event chart with formatted data 
 * @returns {JSX.Element} The JSX element with the event chart.
 */
const GrafanaEventChart: React.FC<EventChartProps> = React.memo(props => {
    const { metricName } = props;
    const [graphType, setGraphType] = useState<string>("timeseries");
    // const [solo, setSolo] = useState<SoloStyles | null>(null);
    console.log("inside GrafanaEventChart")

    // setInterval(() => {
    //     if (solo !== soloStyle) {
    //         setSolo(soloStyle);
    //     }
    // }, 20);
    console.log("metricName: ", metricName)
    let uid = metricName.replace(/.*\/.*\//g, '')
    if (uid.length >= 40) {
        uid = metricName.slice(metricName.length - 39);
    }

    let parsedName = metricName.replace(/.*\/.*\//g, '')
    console.log("uid: ", uid)
    console.log("parsedName: ", parsedName)

    const handleSelectionChange = (event) => {
        setGraphType(event.target.value);
        fetch('http://localhost:1111/random')
    }

    return (
        <div className="chart" data-testid="Grafana Event Chart">
            <h2>{parsedName}</h2>
            {/* create chart using grafana iframe tag*/}
            <iframe src={`http://localhost:32000/d-solo/${uid}/${parsedName}?orgId=1&refresh=10s&from=now-5m&to=now&panelId=1`} width="650" height="400" ></iframe>
            <select name="graphType" id="graphType" value={graphType} onChange={handleSelectionChange}>
                <option value="timeseries">Time Series</option>
                <option value="barchart">Bar Chart</option>
                <option value="stat">Stat</option>
                <option value="gauge">Gauge</option>
                <option value="table">Table</option>
                <option value="histogram">Histogram</option>
            </select>
        </div>
    );
});

export default GrafanaEventChart;
