import React, { useState } from 'react';
import { all, solo as soloStyle } from './sizeSwitch';
import '../stylesheets/GrafanaGraph.scss';

interface EventChartProps {
    metricName: string;
    token: string;
}

// interface SoloStyles {
//     height: number;
//     width: number;
// }

type TimeFrame = '5m' | '15m' | '1h' | '2h' | '1d' | '2d' | '3d';



/** 
 * @params {EventChartProps} props - the props object containing relevant data.
 * @desc Handles k8s metrics. Memoized component to generate event chart with formatted data 
 * @returns {JSX.Element} The JSX element with the event chart.
 */
const GrafanaEventChart: React.FC<EventChartProps> = React.memo(props => {
    const { metricName, token } = props;
    const [graphType, setGraphType] = useState("timeseries");
    const [type, setType] = useState(['timeserie']);
    const [timeFrame, setTimeFrame] = useState('5m');

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
        <div className="chart" id="Grafana_Event_Chart">
            <h2>{`${parsedName} --- ${graphType}`}</h2>
            <div id="selection">
                <label htmlFor="timeFrame">Graph Type: </label>
                <select name="timeFrame" id="timeFrame" onChange={handleSelectionChange}>
                    <option value="timeseries">Time Series</option>
                    <option value="barchart">Bar Chart</option>
                    <option value="stat">Stat</option>
                    <option value="gauge">Gauge</option>
                    <option value="table">Table</option>
                    <option value="histogram">Histogram</option>
                    <option value="piechart">Pie Chart</option>
                    <option value="alertlist">Alert</option>
                </select>

                <label htmlFor="graphType" style={{
                    marginLeft: '20px'
                }}> Time Frame: </label>
                <select name="graphType" id="graphType" onChange={(e) => setTimeFrame(e.target.value as TimeFrame)}>
                    <option value={'5m'}>5 minutes</option>
                    <option value={'15m'}>15 minutes</option>
                    <option value={'1h'}>1 hour</option>
                    <option value={'2h'}>2 hours</option>
                    <option value={'1d'}>1 day</option>
                    <option value={'2d'}>2 days</option>
                    <option value={'3d'}>3 days</option>
                </select>
            </div>
            {/* create chart using grafana iframe tag*/}
            {/* {type[type.length - 1] !== graphType ?
                <iframe src={`http://localhost:32000/d-solo/${uid}/${parsedName}?orgId=1&refresh=10s&from=now-5m&to=now&panelId=1`} width="650" height="400" ></iframe>
                : <iframe src={`http://localhost:32000/d-solo/${uid}/${parsedName}?orgId=1&refresh=10s&from=now-5m&to=now&panelId=1`} width="650" height="400" ></iframe>} */}
            {graphType === "timeseries" ? TimeSeries(uid, parsedName, graphType, timeFrame) :
                graphType === "barchart" ? BarChart(uid, parsedName, graphType, timeFrame) :
                    graphType === "stat" ? Stat(uid, parsedName, graphType, timeFrame) :
                        graphType === "gauge" ? Gauge(uid, parsedName, graphType, timeFrame) :
                            graphType === "table" ? Table(uid, parsedName, graphType, timeFrame) :
                                graphType === "histogram" ? Histogram(uid, parsedName, graphType, timeFrame) :
                                    graphType === "piechart" ? PieChart(uid, parsedName, graphType, timeFrame) :
                                        graphType === "alertlist" ? AlertList(uid, parsedName, graphType, timeFrame) :
                                            null}

        </div>
    );
});

const TimeSeries = (uid, parsedName, graphType, timeFrame) => {
    return <>
        <iframe src={`http://localhost:32000/d-solo/${uid}/${parsedName}?orgId=1&refresh=10s&from=now-${timeFrame}&to=now&panelId=1&${graphType}`} width="800" height="500" ></iframe>
        <hr />
    </>
}

const BarChart = (uid, parsedName, graphType, timeFrame) => {
    return <iframe src={`http://localhost:32000/d-solo/${uid}/${parsedName}?orgId=1&refresh=10s&from=now-${timeFrame}&to=now&panelId=1${graphType}`} width="800" height="500" ></iframe>
}

const Stat = (uid, parsedName, graphType, timeFrame) => {
    return <iframe src={`http://localhost:32000/d-solo/${uid}/${parsedName}?orgId=1&refresh=10s&from=now-${timeFrame}&to=now&panelId=1${graphType}`} width="800" height="500" ></iframe>
}

const Gauge = (uid, parsedName, graphType, timeFrame) => {
    return <iframe src={`http://localhost:32000/d-solo/${uid}/${parsedName}?orgId=1&refresh=10s&from=now-${timeFrame}&to=now&panelId=1${graphType}`} width="800" height="500" ></iframe>
}

const Table = (uid, parsedName, graphType, timeFrame) => {
    return <iframe src={`http://localhost:32000/d-solo/${uid}/${parsedName}?orgId=1&refresh=10s&from=now-${timeFrame}&to=now&panelId=1${graphType}`} width="800" height="500" ></iframe>
}

const Histogram = (uid, parsedName, graphType, timeFrame) => {
    return <iframe src={`http://localhost:32000/d-solo/${uid}/${parsedName}?orgId=1&refresh=10s&from=now-${timeFrame}&to=now&panelId=1${graphType}`} width="800" height="500" ></iframe>
}

const PieChart = (uid, parsedName, graphType, timeFrame) => {
    return <iframe src={`http://localhost:32000/d-solo/${uid}/${parsedName}?orgId=1&refresh=10s&from=now-${timeFrame}&to=now&panelId=1${graphType}`} width="800" height="500" ></iframe>
}

const AlertList = (uid, parsedName, graphType, timeFrame) => {
    return <iframe src={`http://localhost:32000/d-solo/${uid}/${parsedName}?orgId=1&refresh=10s&from=now-${timeFrame}&to=now&panelId=1${graphType}`} width="800" height="500" ></iframe>
}
export default GrafanaEventChart;
