import React, { useState } from 'react';
import { all, solo as soloStyle } from './sizeSwitch';

interface EventChartProps {
    metricName: string;
    token: string;
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
    const { metricName, token } = props;
    const [graphType, setGraphType] = useState("timeseries");
    const [type, setType] = useState(['timeserie']);
    // const [solo, setSolo] = useState<SoloStyles | null>(null);
    console.log("graphType: ", graphType)
    console.log("type: ", type)
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

    let currentType;



    const handleSelectionChange = async (event) => {
        //setGraphType(event.target.value);
        setType([...type, graphType]);
        await fetch('http://localhost:1111/api/updateDashboard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ graphType: event.target.value, metric: metricName, token: token }),
        })
        console.log("event.target.value: ", event.target.value)
        setGraphType(event.target.value);
    }


    return (
        <div className="chart" data-testid="Grafana Event Chart">
            <h2>{`${parsedName} - ${graphType}`}</h2>
            <div>
                <select name="graphType" id="graphType" onChange={handleSelectionChange}>
                    <option value="timeseries">Time Series</option>
                    <option value="barchart">Bar Chart</option>
                    <option value="stat">Stat</option>
                    <option value="gauge">Gauge</option>
                    <option value="table">Table</option>
                    <option value="histogram">Histogram</option>
                </select>
            </div>
            {/* create chart using grafana iframe tag*/}
            {/* {type[type.length - 1] !== graphType ?
                <iframe src={`http://localhost:32000/d-solo/${uid}/${parsedName}?orgId=1&refresh=10s&from=now-5m&to=now&panelId=1`} width="650" height="400" ></iframe>
                : <iframe src={`http://localhost:32000/d-solo/${uid}/${parsedName}?orgId=1&refresh=10s&from=now-5m&to=now&panelId=1`} width="650" height="400" ></iframe>} */}
            {graphType === "timeseries" ? TimeSeries(uid, parsedName, graphType) :
                graphType === "barchart" ? BarChart(uid, parsedName, graphType) :
                    graphType === "stat" ? Stat(uid, parsedName, graphType) :
                        graphType === "gauge" ? Gauge(uid, parsedName, graphType) :
                            graphType === "table" ? Table(uid, parsedName, graphType) :
                                graphType === "histogram" ? Histogram(uid, parsedName, graphType) :
                                    null}

        </div>
    );
});

const TimeSeries = (uid, parsedName, graphType) => {
    return <iframe src={`http://localhost:32000/d-solo/${uid}/${parsedName}?orgId=1&refresh=10s&from=now-5m&to=now&panelId=1&${graphType}`} width="650" height="400" ></iframe>
}

const BarChart = (uid, parsedName, graphType) => {
    return <iframe src={`http://localhost:32000/d-solo/${uid}/${parsedName}?orgId=1&refresh=10s&from=now-5m&to=now&panelId=1${graphType}`} width="650" height="400" ></iframe>
}

const Stat = (uid, parsedName, graphType) => {
    return <iframe src={`http://localhost:32000/d-solo/${uid}/${parsedName}?orgId=1&refresh=10s&from=now-5m&to=now&panelId=1${graphType}`} width="650" height="400" ></iframe>
}

const Gauge = (uid, parsedName, graphType) => {
    return <iframe src={`http://localhost:32000/d-solo/${uid}/${parsedName}?orgId=1&refresh=10s&from=now-5m&to=now&panelId=1${graphType}`} width="650" height="400" ></iframe>
}

const Table = (uid, parsedName, graphType) => {
    return <iframe src={`http://localhost:32000/d-solo/${uid}/${parsedName}?orgId=1&refresh=10s&from=now-5m&to=now&panelId=1${graphType}`} width="650" height="400" ></iframe>
}

const Histogram = (uid, parsedName, graphType) => {
    return <iframe src={`http://localhost:32000/d-solo/${uid}/${parsedName}?orgId=1&refresh=10s&from=now-5m&to=now&panelId=1${graphType}`} width="650" height="400" ></iframe>
}
export default GrafanaEventChart;
