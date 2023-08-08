import React, { useState } from 'react';
import { all, solo as soloStyle } from './sizeSwitch';

interface EventChartProps {
    parsedName: string;
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
    const { parsedName } = props;
    // const [solo, setSolo] = useState<SoloStyles | null>(null);
    console.log("inside GrafanaEventChart")

    // setInterval(() => {
    //     if (solo !== soloStyle) {
    //         setSolo(soloStyle);
    //     }
    // }, 20);


    return (
        <div className="chart" data-testid="Grafana Event Chart">
            <div>grafana</div>
            {/* create chart using grafana */}
            <iframe src={`http://localhost:32000/d-solo/${parsedName}/${parsedName}?orgId=1&refresh=10s&from=now-5m&to=now&panelId=1`} width="650" height="400" ></iframe>
        </div>
    );
});

export default GrafanaEventChart;
