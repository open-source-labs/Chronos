import React, { useEffect,useContext, useState } from "react";
import { AwsContext } from '../context/AwsContext';


interface Props {
  awsUrl: string;
}
interface Dashboard {
  uid: string,
  url: string,
  title: string,
  
}

const GrafanaIFrame: React.FC<Props> = ({ awsUrl }) => {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [iframes, setIframes] = useState<JSX.Element[]>([]);
  const { awsEksData, setAwsEksData, setLoadingState } = useContext(AwsContext);

  useEffect(() => {
    return () => {
      setAwsEksData({});
      setLoadingState(true);
    };
  }, []);

  useEffect(() => {
    const url = `${awsUrl}/api/search?folderIds=0`
    console.log(awsUrl)
    const fetchDashboards = async () => {
      const response = await fetch(url, {
        method: 'GET',
        mode:"no-cors",
        headers: {
          
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: 'Bearer eyJrIjoiamN4UGRKVHg3cUQyZ201N042NW41bHg5bGhJaVFlaFciLCJuIjoidGVzdEtleSIsImlkIjoxfQ=='
        },
      });
      const data = await response.json();
      const tempDashboards = data.map((dashboard: any) => ({
        uid: dashboard.uid,
        url: dashboard.url,
        title: dashboard.title,
      }));
      setDashboards(tempDashboards);
    };
    fetchDashboards();
  }, [awsUrl]);

  useEffect(() => {
    const iframesArr: JSX.Element[] = [];
    for (const dashboard of dashboards) {
      const iframe = (
        <iframe
          key={dashboard.uid}
          src={`${awsUrl}${dashboard.url}`}
          title={dashboard.title}
          width="100%"
          height="600"
          style={{ border: "none" }}
        />
      );
      iframesArr.push(iframe);
    }
    setIframes(iframesArr);
  }, [dashboards, awsUrl]);
  return (
    <div>
      {iframes}
    <div>${awsUrl}</div>
    
    </div>
    )
};


export default GrafanaIFrame;
