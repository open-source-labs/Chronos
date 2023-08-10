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

    return (
        <div className="chart" data-testid="Grafana Event Chart">
            <br />
            <h2>{parsedName}</h2>
            {/* create chart using grafana */}
            <iframe src={`http://localhost:32000/d-solo/${uid}/${parsedName}?orgId=1&refresh=10s&from=now-5m&to=now&panelId=1`} width="650" height="400" ></iframe>
        </div>
    );
});

export default GrafanaEventChart;
